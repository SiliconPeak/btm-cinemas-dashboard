import { FC, ReactElement } from "../../lib/types";
import {Table as AntTable, Tag,Button, Space} from "antd";
import type { ColumnsType } from "antd/es/table";
import { ColumnDataType } from "../../lib/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const columns:ColumnsType<ColumnDataType> = [
    {
        title:'Full Name',
        dataIndex:'name',
        key:'name'
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
                role === "Admin" ? 
                <Tag color="gold">{role}</Tag> :
                <Tag color="purple">{role}</Tag>
               }
            </>
        ) 
    },
    {
        title:'Action',
        key:'operation',
        render:() => (
            <Space size="small">
              <Button type="primary" size="middle" icon={<EditOutlined/>}>Edit</Button>
              <Button type="primary" size="middle" icon={<DeleteOutlined/>} danger>Delete</Button>
            </Space>
        )
    }
];
const data:ColumnDataType[] = [];
for(let i=0; i< 100;i++) {
    data.push({
        key:i,
        name:`Bimal${i}`,
        email:`bimalmagar${i}@gmail.com`,
        role:'Admin'
    });
}
const Table:FC = ():ReactElement => {
    return (
          <AntTable columns={columns} dataSource={data} size="large" scroll={{y:350}} bordered/>
    )
};

export default Table;
