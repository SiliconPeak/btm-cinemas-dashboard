import { FC, ReactElement } from "../../lib/types";
import withPageListLayout from "../../components/HOC/withPageListLayout";
import MovieTable from "../../components/Table/MovieTable";
const Movies:FC =  ():ReactElement => {
    return (
        <MovieTable/>
    )
};

export default withPageListLayout(Movies);