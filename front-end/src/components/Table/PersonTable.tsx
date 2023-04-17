import { Table,Space,Button, Modal, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined} from "@ant-design/icons";
import type { PersonColumnType } from "../../lib/types";
import { useEffect, useMemo, useState } from "react";
import { personServices } from "../../services/person.services";

const PersonTable = () => {
    const [persons,setPersons] = useState<PersonColumnType[]>([]);
    const [openDeleteModal,setVisibilityOfDeleteModal] = useState<boolean>(false);
    const [messageApi,contextHolder] = message.useMessage();
    const [selectedPerson,setDeletingPerson] = useState("");
    const columns:ColumnsType<PersonColumnType> = useMemo(() => [
        {
          title:'Name',
          dataIndex:'name',
          key:'name',

        },
        {
            title:'Email',
            dataIndex:'email',
            key:'email',
        },
        {
            title:'Status',
            dataIndex:'status',
            key:'status',
        },
        {
            title:'Contact',
            dataIndex:'contact',
            key:'contact'
        },
        {
            title:'Action',
            dataIndex:'id',
            key:'id',
            render:(PersonId) => {
                return (
                <Space size="small">
                        <Button 
                            type="primary" 
                            size="middle" 
                            icon={<EditOutlined/>}
                            href={`/person/edit/${PersonId}`}
                        >
                            Edit
                        </Button>
                        <Button 
                            type="primary" 
                            size="middle" 
                            icon={<DeleteOutlined/>}
                            onClick={() => {
                                setDeletingPerson(PersonId);
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
            const res = await personServices.deletePerson(selectedPerson);
            if(res && res.status == 200) {
                setVisibilityOfDeleteModal(false);
                message.success('Genre deleted successfully!!',2,() => {
                    setPersons(persons.filter(person => person.id !== selectedPerson))
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
            const res = await personServices.getAll();
            setPersons(res.data);
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
            dataSource={persons} 
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
                setDeletingPerson("");
             }}
          />
    </>
   )
};

export default PersonTable;