import {  Form, Input, Select,Button,Row,Col} from "antd";
import { FC, ReactElement } from "../../lib/types";
import { registerUser } from "../../services/user.service";
import withForm from "../HOC/withForm";
const {Option} = Select;

const register = (values:any) => {
    if(values) {
        let newName = `${values.firstname} ${values.middlename ?? ''} ${values.lastname}`
        values = {
            usrName:newName,
            usrEmail:values.email,
            usrPassword:values.password,
            status:'active',
            roleId:values.role
        }
        return registerUser(values);
    }
};


const UserForm:FC = (props:any):ReactElement => {
    return (
            <Form
                form={props.form}
                name="control-hooks"
                onFinish={props.onFinish}
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
                            <Input type="email" size="small"/>
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
                            loading={props.loading}
                        >
                            {props.loading ? 'Submitting' : 'Submit'}
                        </Button>
                        <Button htmlType="button" onClick={props.onReset}>
                            Reset
                        </Button>
                    </Col>
                </Row>
            </Form>
    );
};
export default withForm(UserForm,register);