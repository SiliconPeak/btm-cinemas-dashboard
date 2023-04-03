import { ReactElement,FC } from "../../lib/types";
import { 
    Breadcrumb,
    Form,
    Typography,
    Col,
    Row,
    Input,
    Select,
    Button,
    message
} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { editUserById, getUserById } from "../../services/user.service";
const {Title} = Typography;
const {Option} = Select;
const UserEditForm:FC = ():ReactElement => {
    const [form]= Form.useForm();
    const [messageApi,contextHolder] = message.useMessage();
    const [loading,setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    let {id:userId} = useParams(); 
    const onReset = () => {
        form.resetFields();
    };
    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await getUserById(userId);
                if(user.status === 200){
                    form.setFieldsValue({
                        fullname:user.data.usrName,
                        email:user.data.usrEmail,
                        status:user.data.status,
                        roleId:user.data.roleId,
                    })
                } else {
                    throw 'User not found';
                }
            }catch(err) {
                alert(err);
            }
           
        };
        getUser();
    },[])
    

    const onFinish = (values:any) => {
        if(values) {
           let editBody = {
            usrName:values.fullname,
            status:values.status,
            roleId:values.roleId,
           };
           messageApi.open({
            type:'loading',
            content:'Updating...',
                duration:2.5
            }).then(() => {
                 const editUser = async () => {
                    try {
                        const response = await editUserById(userId,editBody);                      
                        if(response.status === 200) {
                           message.success('User updated successfully!!',1,() => {
                             navigate('/');
                           });
                        } else {
                            throw "Error on updating user";
                        }
                        
                    }catch(err) {
                       message.error('Something went wrong!!',2);
                    }
                   
                };
                editUser();
               
            })
            
        }
    }

    return (
        <div className="user__form-container">
            <div className="form__header">
                <Breadcrumb 
                separator=">"
                items={[
                    {
                        title:<Link to="/">User</Link>
                    },
                    {
                        title:'Create'
                    }
                ]}
                />
            </div>
            <div className="user__form-body">
                {contextHolder}
                <div className="user__form-heading">
                    <Title level={4}>Update User</Title>
                </div>
                <Form
                  form={form}
                  name="control-hooks"
                  onFinish={onFinish}
                >
                    <Row gutter={[25,8]}>
                        <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="Full Name"
                                name="fullname"
                                rules={[{required:true,message:"Please enter full name."}]}
                            >
                                <Input size="small"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                            label="status"
                            name="status"
                            rules={[{required:true,message:"Status is required!!"}]}
                            >
                                <Select placeholder="Choose status"  size="small">
                                    <Option value="active">Active</Option>
                                    <Option value="inactive">Inactive</Option>
                                </Select>
                            </Form.Item>
                        </Col> 
                        <Col span={8}>
                            <Form.Item
                            label="Role"
                            name="roleId"
                            rules={[{required:true,message:"Role is required!!"}]}
                            >
                                <Select placeholder="Choose role"  size="small">
                                    <Option value="1">Admin</Option>
                                    <Option value="2">User</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24} style={{textAlign:"right"}}>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                style={{marginRight:"10px"}}
                                loading={loading}
                            >
                                {loading ? 'Editting' : 'Edit'}
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default UserEditForm;