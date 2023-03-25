import { FC, ReactElement } from "../../lib/types";
import {Table as AntTable, Tag,Button, Space} from "antd";
import type { ColumnsType } from "antd/es/table";
import { ColumnDataType } from "../../lib/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getUsers } from "../../services/user.service";
import { Link } from "react-router-dom";
const columns:ColumnsType<ColumnDataType> = [
    {
        title:'Full Name',
        dataIndex:'fullname',
        key:'fullname'
    },
    {
        title:'Email',
        dataIndex:'email',
        key:'email'
    },
    {
        title:'Role',
        dataIndex:'role',
        key:'role',
        render:(_,{role}) => (
            <>
               {
                role.toLowerCase() === "admin" ? 
                <Tag color="gold">{role}</Tag> :
                <Tag color="purple">{role}</Tag>
               }
            </>
        ) 
    },
    {
        title:'Action',
        key:'action',
        render:(_,{userId}) => (
            <Space size="small">
            <Link to={`/user/edit/${userId}`}>
                <Button 
                    type="primary" 
                    size="middle" 
                    icon={<EditOutlined/>}
                >
                    Edit
                </Button>
            </Link>
            <Link to={`/user/delete/${userId}`}>
                <Button 
                    type="primary" 
                    size="middle" 
                    icon={<DeleteOutlined/>}
                    href={`/user/delete/${userId}`}
                    danger
                >
                    Delete
                </Button>
            </Link>
            </Space>
        )
    }
];
// const data:ColumnDataType[] = [];

// for(let i=0; i< 100;i++) {
//     data.push({
//         key:i,
//         fullname:`Bimal${i}`,
//         email:`bimalmagar${i}@gmail.com`,
//         role:'Admin'
//     });
// }



const Table:FC = ():ReactElement => {
    const [data,setData] = useState<ColumnDataType[]>([]);
    const d:ColumnDataType[] =[];
    
    useEffect(() => {
        const getAllUsers = async () => {
            const users = await getUsers();
            users.forEach((el:any,index:number) => {
                d.push({
                    key:index,
                    fullname:el.usrName,
                    email:el.usrEmail,
                    role:el.role.title,
                    userId:el.id
                })
            });
            setData(d);
            
        };
        getAllUsers();
    },[]);

    return (
          <AntTable columns={columns} dataSource={data} size="large" scroll={{y:350}} bordered/>
    )
};

export default Table;
