import { Table,Space,Button, Modal, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined} from "@ant-design/icons";
import type { GenreColumnType } from "../../lib/types";
import { useEffect, useMemo, useState } from "react";
import { genreServices } from "../../services/genre.services";
const GenreTable = () => {
    const [genres,setGenres] = useState<GenreColumnType[]>([]);
    const [openDeleteModal,setVisibilityOfDeleteModal] = useState<boolean>(false);
    const [messageApi,contextHolder] = message.useMessage();
    const [selectedGenre,setDeletingGenre] = useState("");
    const columns:ColumnsType<GenreColumnType> = useMemo(() => [
        {
          title:'Name',
          dataIndex:'name',
          key:'name',

        },
        {
            title:'Status',
            dataIndex:'status',
            key:'status',
        },
        {
            title:'Action',
            dataIndex:'id',
            key:'id',
            render:(genreid) => {
                return (
                <Space size="small">
                        <Button 
                            type="primary" 
                            size="middle" 
                            icon={<EditOutlined/>}
                            href={`/genres/edit/${genreid}`}
                        >
                            Edit
                        </Button>
                        <Button 
                            type="primary" 
                            size="middle" 
                            icon={<DeleteOutlined/>}
                            onClick={() => {
                                setDeletingGenre(genreid);
                                setVisibilityOfDeleteModal(true);
                            }}
                            danger
                        >
                            Delete
                        </Button>
                    </Space>
                )
            }
        }
   ],[]); 

   const handleDelete = async () => {
        try {
            const res = await genreServices.deleteGenre(selectedGenre);
            if(res && res.status == 200) {
                setVisibilityOfDeleteModal(false);
                message.success('Genre deleted successfully!!',2,() => {
                    setGenres(genres.filter(genre => genre.id !== selectedGenre))
                })
            }
        } catch (err) {
            message.error('Oops,something went wrong!!',2);
        }
    
   }

   const data = [
        {
            key:'1',
            name:'Action',
            status:'active'
        },
        {
            key:'2',
            name:'History',
            status:'active'
        }
   ];

   useEffect(() => {
      const getAllGenres = async () => {
        try {
            const res = await genreServices.getAll();
           setGenres(res.data);
           console.log(res);
        } catch(err) {
            console.log('error!!')
        }
       
      };
      getAllGenres();
   },[])
   return (
    <>
        {contextHolder}
        <Table
            columns={columns} 
            dataSource={genres} 
            size="large" 
            scroll={{y:350}} 
            bordered
        />
        <Modal
             title=" Are you sure you want to delete this user?"
             open={openDeleteModal}
             okText="Yes"
             cancelText="No"
             onOk={handleDelete}
             onCancel={() => {
                setVisibilityOfDeleteModal(false);
                setDeletingGenre("");
             }}
          />
    </>
   )
};

export default GenreTable;