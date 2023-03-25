import { Breadcrumb, Form, Input, Select,Button,Row,Col,Typography,message} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FC, ReactElement } from "../../lib/types";
import { registerUser } from "../../services/user.service";
import {redirect,useNavigate} from "react-router-dom";
import "./UserForm.css";
const {Option} = Select;
const {Title} = Typography

const UserForm:FC = ():ReactElement => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi,contextHolder] = message.useMessage();
    const [loading,setLoading] = useState<boolean>(false);
    const onReset = () => {
        form.resetFields();
    };
    const onFinish = (values:any) => {
        setLoading(true);
        messageApi.open({
            type:'loading',
            content:'Submitting',
            duration:2
        }).then(() => {
            if(values) {
                let newName = `${values.firstname} ${values.middlename ?? ''} ${values.lastname}`
                values = {
                    usrName:newName,
                    usrEmail:values.email,
                    usrPassword:values.password,
                    status:'active',
                    roleId:values.role
                }
            }
            const register = async () => {
                try {
                    const response = await registerUser(values);
                    console.log(response);
                    
                }catch(err) {
                    message.error('Error on registering user!!',2);
                }
               
            }
            register();
            setLoading(false);
            message.success('User registered successfully',1,() => {
                setLoading(false);
                navigate("/");
            })
        });
       
        
        // setTimeout(() => {
           
        //     setLoading(false);
        // },2000);
    };
    return (
        <div className="user__form-container">
            {contextHolder}
            <div className="form__header">
              <Breadcrumb separator=">">
                <Breadcrumb.Item><Link to="/">User</Link></Breadcrumb.Item>
                <Breadcrumb.Item>Create</Breadcrumb.Item>
              </Breadcrumb> 
            </div>
            <div className="user__form-body">
                <div className="user_form-heading">
                    <Title level={4}> Create user</Title>
                </div> 
                <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                >
                    <Row gutter={[25,8]}>
                        <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="First Name"
                                name="firstname"
                                rules={[{required:true,message:"Please enter first name."}]}
                            >
                                <Input size="small"/>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="Middle Name"
                                name="middlename"
                            >
                                <Input  size="small"/>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="Last Name"
                                name="lastname"
                                rules={[{required:true,message:"Please enter last name."
                                }]}
                            >
                                <Input  size="small"/>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Form.Item
                            label="Email address"
                            name="email"
                            rules={[{required:true,message:"Please enter email."}]}
                            >
                                <Input type="emai" size="small"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                            label="Password"
                            name="password"
                            rules={[{required:true,message:"Please enter password."}]}
                            >
                                <Input.Password placeholder="Enter password"  size="small"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                {
                                    required:true,
                                    message:"Please confirm your password."
                                },
                                ({getFieldValue}) => (
                                    {
                                        validator(_, value) {
                                           if(!value || getFieldValue('password') === value){
                                                return Promise.resolve();
                                           } 
                                           return Promise.reject(new Error('Passwords that you entered do not match!'))
                                        },
                                    }
                                )
                            ]}
                            >
                                <Input.Password placeholder="Confirm password"  size="small"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                            label="Role"
                            name="role"
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
                                {loading ? 'Submitting' : 'Submit'}
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
}
export default UserForm;