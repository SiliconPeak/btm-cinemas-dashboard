import {useState} from "react";
import { FC, ReactElement } from "../../lib/types";
import { Typography,Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { Link} from "react-router-dom";
import "./User.css";
import Table from "../../components/Table";
const {Title} = Typography;
const User:FC = ():ReactElement => {
    return (
        <div className="user__settings">
            <div className="user__settings-header">
                <Title level={4}>Users List</Title>
                <Button type="primary" icon={<UserAddOutlined style={{fontSize:"18px"}}/>}>
                    <Link to="/users/create">Add User</Link>
                </Button>
            </div>
            <Table/>
        </div>
    );
};

export default User;