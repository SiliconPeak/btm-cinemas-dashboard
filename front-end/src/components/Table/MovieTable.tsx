import { Table,Space,Button, Modal, message, Badge, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined} from "@ant-design/icons";
import type { MovieColumnType } from "../../lib/types";
import { useEffect, useMemo, useState } from "react";
import { movieServices } from "../../services/movie.services";

const MovieTable = () => {
    const [movies,setMovies] = useState<MovieColumnType[]>([]);
    const [openDeleteModal,setVisibilityOfDeleteModal] = useState<boolean>(false);
    const [messageApi,contextHolder] = message.useMessage();
    const [selectedMovie,setDeletingMovie] = useState("");
    const columns:ColumnsType<MovieColumnType> = useMemo(() => [
        {
          title:'Name',
          dataIndex:'name',
          key:'name',

        },
        {
            title:'Language',
            dataIndex:'language',
            key:'language',
        },
        {
            title:'Status',
            dataIndex:'status',
            key:'status',
            render:(status) => {
                let color;
                if(status === "active") {
                    color="purple";
                } else {
                    color="red";
                }
                return <Tag color={color}>{status}</Tag>;
            }
        },
        {
            title:'Duration',
            dataIndex:'duration',
            key:'duration'
        },
        {
            title:'Action',
            dataIndex:'id',
            key:'id',
            render:(MovieId:string) => {
                return (
                <Space size="small">
                        <Button 
                            type="primary" 
                            size="middle" 
                            icon={<EditOutlined/>}
                            href={`/movie/edit/${MovieId}`}
                        >
                            Edit
                        </Button>
                        <Button 
                            type="primary" 
                            size="middle" 
                            icon={<DeleteOutlined/>}
                            onClick={() => {
                                setDeletingMovie(MovieId);
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
            const res = await movieServices.deleteMovie(selectedMovie);
            if(res && res.status == 200) {
                setVisibilityOfDeleteModal(false);
                message.success('Movie deleted successfully!!',2,() => {
                    setMovies(movies.filter(movie => movie.id !== selectedMovie))
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
      const getAllPersons = async () => {
        try {
            const res = await movieServices.getAll();
            setMovies(res.data);
            console.log(res);
        } catch(err) {
            console.log('error!!')
        }
       
      };
      getAllPersons();
   },[])
   return (
    <>
        {contextHolder}
        <Table
            columns={columns} 
            dataSource={movies} 
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
                setDeletingMovie("");
             }}
          />
    </>
   )
};

export default MovieTable;