import { Table,Space,Button, Modal, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined} from "@ant-design/icons";
import type { MovieRoleColumnType } from "../../lib/types";
import { useEffect, useMemo, useState } from "react";
import { movieRoleServices } from "../../services/movie-role.services";

const MovieRoleTable = () => {
    const [genres,setGenres] = useState<MovieRoleColumnType[]>([]);
    const [openDeleteModal,setVisibilityOfDeleteModal] = useState<boolean>(false);
    const [messageApi,contextHolder] = message.useMessage();
    const [selectedMovieRole,setDeletingMovieRole] = useState("");
    const columns:ColumnsType<MovieRoleColumnType> = useMemo(() => [
        {
          title:'Title',
          dataIndex:'title',
          key:'title',

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
            render:(movieRoleId) => {
                return (
                <Space size="small">
                        <Button 
                            type="primary" 
                            size="middle" 
                            icon={<EditOutlined/>}
                            href={`/movie-roles/edit/${movieRoleId}`}
                        >
                            Edit
                        </Button>
                        <Button 
                            type="primary" 
                            size="middle" 
                            icon={<DeleteOutlined/>}
                            onClick={() => {
                                setDeletingMovieRole(movieRoleId);
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
            const res = await movieRoleServices.deleteMovieRole(selectedMovieRole);
            if(res && res.status == 200) {
                setVisibilityOfDeleteModal(false);
                message.success('Genre deleted successfully!!',2,() => {
                    setGenres(genres.filter(genre => genre.id !== selectedMovieRole))
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
      const getAllMovieRoles = async () => {
        try {
            const res = await movieRoleServices.getAll();
            setGenres(res.data);
            console.log(res);
        } catch(err) {
            console.log('error!!')
        }
       
      };
      getAllMovieRoles();
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
                setDeletingMovieRole("");
             }}
          />
    </>
   )
};

export default MovieRoleTable;