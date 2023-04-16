import withPageListLayout from "../../components/HOC/withPageListLayout";
import { ReactElement } from "../../lib/types";
const Person = ():ReactElement => {
    return (
        <div>PERSON</div>
    )
};
export default withPageListLayout(Person);