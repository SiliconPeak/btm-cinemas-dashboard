import { FC, ReactElement } from "../../lib/types";
import {
    Table as AntTable, 
    Tag,
    Button, 
    Space,
    Modal
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { ColumnDataType } from "../../lib/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../services/user.service";



const Table:FC = ():ReactElement => {
    const [data,setData] = useState<ColumnDataType[]>([]);
    const [openDeleteModal,setVisibilityOfDeleteModal] = useState<boolean>(false);
    const [deletingUser,setDeletingUser]= useState(null);
    const columns:ColumnsType<ColumnDataType> = [
        {
            title:'Full Name',
            dataIndex:'usrName',
            key:'usrName',
            render:(record) => {
                return <>{record}</>
            }
        },
        {
            title:'Email',
            dataIndex:'usrEmail',
            key:'usrEmail'
        },
        {
            title:'Role',
            dataIndex:'role',
            key:'role',
            render:(role) => (
                <>
                   {
                    role.title.toLowerCase() === "admin" ? 
                    <Tag color="gold">{role.title}</Tag> :
                    <Tag color="purple">{role.title}</Tag>
                   }
                </>
            ) 
        },
        {
            title:'Action',
            dataIndex:"id",
            key:'id',
            render:(userId) => {
               
                return (
                    <Space size="small">
                        <Button 
                            type="primary" 
                            size="middle" 
                            icon={<EditOutlined/>}
                            href={`/user/edit/${userId}`}
                        >
                            Edit
                        </Button>
                        <Button 
                            type="primary" 
                            size="middle" 
                            icon={<DeleteOutlined/>}
                            onClick={() => {
                                setDeletingUser(userId);
                                setVisibilityOfDeleteModal(true);
                            }}
                            danger
                        >
                            Delete
                        </Button>
                    </Space>
                );
            }
        }
    ];
    
    useEffect(() => {
       getAllUsers();
    },[])
    const handleDelete = async () => {
        try {
            const deleted =  await deleteUser(deletingUser);
            setData(data.filter(user => user.id !== deletingUser))
            setVisibilityOfDeleteModal(false);
        } catch(err) {
            console.log('ERROR ON DELETING USER!!');
        }
       
    }
    const getAllUsers = async () => {
        try {
            const users = await getUsers();
            console.log(users);
            if(users.status === 200) {
                setData(users.data);
            } else {
                throw "User not found";
            }
           
        }catch(err) {
            setData([]);
            console.log('ERROR!!');
        }
    };

    return (
        <>
          <AntTable 
            columns={columns} 
            dataSource={data} 
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
                setDeletingUser(null);
             }}
          />
        </>
    )
};

export default Table;
