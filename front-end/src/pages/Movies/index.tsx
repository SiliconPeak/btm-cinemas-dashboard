import { FC, ReactElement } from "../../lib/types";
import withPageListLayout from "../../components/HOC/withPageListLayout";
const Movies:FC =  ():ReactElement => {
    return (
        <>
            This is movies page
        </>
    );
};

export default withPageListLayout(Movies);