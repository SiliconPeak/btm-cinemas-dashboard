import withPageListLayout from "../../components/HOC/withPageListLayout";
import { ReactElement } from "../../lib/types";
import DepartmentTable from "../../components/Table/DepartmentTable";
const Department = ():ReactElement => {
    return <DepartmentTable/>
};
export default withPageListLayout(Department);