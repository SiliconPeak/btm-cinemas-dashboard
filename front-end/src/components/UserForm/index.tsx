import { Breadcrumb, Form, Input, Select,Button,Row,Col,Typography} from "antd";
import { Link } from "react-router-dom";
import { FC, ReactElement } from "../../lib/types";
import "./UserForm.css";
const {Option} = Select;
const {Title} = Typography

const UserForm:FC = ():ReactElement => {
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
    };
    const onFinish = (values:any) => {
        alert(JSON.stringify(values,null,2))
    };
    return (
        <div className="user__form-container">
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
                            rules={[{required:true,message:"Please enter email."}]}
                            >
                                <Input.Password placeholder="Enter password"  size="small"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            rules={[{required:true,message:"Please enter email."}]}
                            >
                                <Input.Password placeholder="Confirm password"  size="small"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                            label="Role"
                            name="role"
                            rules={[{required:true}]}
                            >
                                <Select placeholder="Choose role"  size="small">
                                    <Option value="admin">Admin</Option>
                                    <Option value="user">User</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24} style={{textAlign:"right"}}>
                            <Button type="primary" htmlType="submit" style={{marginRight:"10px"}}>
                                Submit
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