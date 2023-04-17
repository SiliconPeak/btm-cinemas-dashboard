import withPageListLayout from "../../components/HOC/withPageListLayout";
import PersonTable from "../../components/Table/PersonTable";
import { ReactElement } from "../../lib/types";
const Person = ():ReactElement => {
    return <PersonTable/>
};
export default withPageListLayout(Person);