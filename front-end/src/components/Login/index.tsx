import { ReactElement,FC } from "../../lib/types";
import {
    Button,
    Form, Input
} from "antd";
import { UserOutlined,LockOutlined } from '@ant-design/icons';

const Login:FC = ():ReactElement => {
    const [form] = Form.useForm();
    const onFinish = (values:any) => {
        console.log(values);
    };
    return (
        <div className="login-form">
        <h2 style={{textAlign:"center",marginBottom:"20px",textTransform:"uppercase"}}>Login</h2>
        <Form
          layout="vertical"
          name="basic"
          form={form}
          onFinish={onFinish}
        >
             <Form.Item
                label="Username"
                name="usrEmail"
                rules={[{ required: true, message: 'Please enter your email!' }]}
             >
                <Input placeholder="Username" prefix={<UserOutlined/>}/>
             </Form.Item>
             <Form.Item
               label="Password"
               name="usrPassword"
               rules={[
                {
                    required:true,message:'Please enter your password!!'
                }
               ]}
             >
                <Input.Password prefix={<LockOutlined />}/>
             </Form.Item>
             <Form.Item>
                <Button type="link" className="forgot-password-link">Forgot password?</Button>
             </Form.Item>
             <Form.Item
               style={{marginTop:"-1rem"}}
             >
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Login
                </Button>
             </Form.Item>
        </Form>
        </div>
    );
};

export default Login;