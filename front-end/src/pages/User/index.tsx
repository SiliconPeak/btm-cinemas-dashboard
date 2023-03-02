import { FC, ReactElement } from "../../lib/types";
import { Typography,Button } from "antd";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import "./User.css";
import Table from "../../components/Table";
const {Title} = Typography;
const User:FC = ():ReactElement => {
    return (
        <div className="user__settings">
            <div className="user__settings-header">
                <Title level={4}>Users List</Title>
                <Button type="primary" icon={<UserAddOutlined style={{fontSize:"18px"}}/>}>Add User</Button>
            </div>
            <Table/>
        </div>
    );
};

export default User;