import {useState} from "react";
import { FC, ReactElement } from "../../lib/types";
import { Typography,Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { Link} from "react-router-dom";
import "./User.css";
import Table from "../../components/Table";
import withPageListLayout from "../../components/HOC/withPageListLayout";
const User:FC = ():ReactElement => {
    return <Table/>;
};

export default withPageListLayout(User)