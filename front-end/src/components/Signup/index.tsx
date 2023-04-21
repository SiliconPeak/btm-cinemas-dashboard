import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input,Button } from "antd";
import { ReactElement } from "../../lib/types";

const Signup = ():ReactElement => {
    const [form] = Form.useForm();
    const onFinish = (values:any) => {
        // alert(JSON.stringify(values,null,2));
    }
    return (
        <div className="signup-form">
            <h2 style={{textAlign:"center",textTransform:"uppercase",marginBottom:"1rem"}}>Sign Up</h2>
            <div className="signup-form__container">
                <Form
                  layout="vertical"
                  name="basic"
                  form={form}
                  onFinish={onFinish}
                >
                    <Form.Item
                       label="Name"
                       name="usrName"
                       rules={[
                        {required:true,message:'Name is required!!'}
                       ]}
                    >
                        <Input placeholder="Username" prefix={<UserOutlined/>}/>
                    </Form.Item>
                    <Form.Item
                      name="usrEmail"
                      label="Email address"
                      rules={[{
                        required:true,message:'Email is required!!'
                      }]}
                    >
                        <Input type="email" placeholder="Email" prefix={<MailOutlined/>}/>
                    </Form.Item>
                    <Form.Item
                       name="usrPassword"
                       label="Password"
                       rules={[
                        {
                            required:true,message:"Password is required!!"
                        }
                       ]}
                    >
                        <Input.Password placeholder="Password" prefix={<LockOutlined/>}/>
                    </Form.Item>
                    <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            dependencies={['usrPassword']}
                            rules={[
                                {
                                    required:true,
                                    message:"Please confirm your password!!"
                                },
                                ({getFieldValue}) => (
                                    {
                                        validator(_, value) {
                                           if(!value || getFieldValue('usrPassword') === value){
                                                return Promise.resolve();
                                           } 
                                           return Promise.reject(new Error('Passwords that you entered do not match!'))
                                        },
                                    }
                                )
                            ]}
                            >
                                <Input.Password placeholder="Confirm password" prefix={<LockOutlined/>}/>
                            </Form.Item>
                            <Form.Item style={{paddingTop:"1rem"}}>
                                <Button type="primary" className="signup-form-button">Sign Up</Button>
                            </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Signup;