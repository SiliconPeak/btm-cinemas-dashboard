import { FC, ReactElement } from "../../lib/types";
import "./User.css";
import Table from "../../components/Table";
import withPageListLayout from "../../components/HOC/withPageListLayout";
const User:FC = ():ReactElement => {
    return <Table/>;
};

export default withPageListLayout(User)