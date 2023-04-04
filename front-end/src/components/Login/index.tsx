import { ReactElement,FC } from "../../lib/types";
import {
    Button,
    Form, 
    Input,
    message
} from "antd";
import { UserOutlined,LockOutlined } from '@ant-design/icons';
import authService from "../../services/auth.services";
import { useState } from "react";

const Login:FC = ():ReactElement => {
    const [form] = Form.useForm();
    const [loading,setLoading] = useState<boolean>(false);
    const [messageApi,contextHolder] = message.useMessage();
   
    const onFinish = (values:any) => {
        setLoading(true);
       
            const handleLogin = async () => {
              const res  = await authService.login(values);
            if(res && res.status !== 200) {
                messageApi.error(res.error);
                return;
            }
            messageApi.success('Loggin in...');
            setTimeout(() => {
              window.location.href = "/";
            }, 2000);
            };
            handleLogin();
            setLoading(false);
       
    };
    return (
        <div className="login-form">
        <h2 style={{textAlign:"center",marginBottom:"20px",textTransform:"uppercase"}}>Login</h2>
        {contextHolder}
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
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  className="login-form-button"
                  loading={loading}
                >
                    Login
                </Button>
             </Form.Item>
        </Form>
        </div>
    );
};

export default Login;