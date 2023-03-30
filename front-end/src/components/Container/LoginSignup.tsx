import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
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
                    },
                    {
                        label:'Sign Up',
                        key:'signup',
                        children:<Signup/>
                    }
                ]}
            />
       </div>
    </div>
  );
};

export default LoginSignup;