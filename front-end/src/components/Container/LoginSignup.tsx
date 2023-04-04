import { Tabs } from 'antd';
import { FC, ReactElement } from "../../lib/types";
import Login from '../Login';
import Signup from '../Signup';
const LoginSignup:FC = ():ReactElement => {

  return (
    <div className="login-signup">
        <div className="login-signup__container">
            <Tabs
                defaultActiveKey="1"
                size="middle"
                style={{ marginBottom: 32 }}
                items = {[
                    {
                        label:'Login',
                        key:'login',
                        children:<Login/>
                    }
                ]}
            />
       </div>
    </div>
  );
};

export default LoginSignup;