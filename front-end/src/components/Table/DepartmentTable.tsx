import { Table,Space,Button, Modal, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined} from "@ant-design/icons";
import type { DepartmentColumnType } from "../../lib/types";
import { useEffect, useMemo, useState } from "react";
import { departmentServices } from "../../services/department.services";

const DepartmentTable = () => {
    const [genres,setGenres] = useState<DepartmentColumnType[]>([]);
    const [openDeleteModal,setVisibilityOfDeleteModal] = useState<boolean>(false);
    const [messageApi,contextHolder] = message.useMessage();
    const [selectedDepartment,setDeletingDepartment] = useState("");
    const columns:ColumnsType<DepartmentColumnType> = useMemo(() => [
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
                            href={`/department/edit/${movieRoleId}`}
                        >
                            Edit
                        </Button>
                        <Button 
                            type="primary" 
                            size="middle" 
                            icon={<DeleteOutlined/>}
                            onClick={() => {
                                setDeletingDepartment(movieRoleId);
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
            const res = await departmentServices.deleteDepartment(selectedDepartment);
            if(res && res.status == 200) {
                setVisibilityOfDeleteModal(false);
                message.success('Department deleted successfully!!',2,() => {
                    setGenres(genres.filter(genre => genre.id !== selectedDepartment))
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
      const getAllDepartment = async () => {
        try {
            const res = await departmentServices.getAll();
            setGenres(res.data);
            console.log(res);
        } catch(err) {
            console.log('error!!')
        }
       
      };
      getAllDepartment();
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
                setDeletingDepartment("");
             }}
          />
    </>
   )
};

export default DepartmentTable;