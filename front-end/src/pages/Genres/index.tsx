import withPageListLayout from "../../components/HOC/withPageListLayout";
import { ReactElement } from "../../lib/types";
import GenreTable from "../../components/Table/GenreTable";
const Genres = ():ReactElement => {
    return (
       <GenreTable/>
    )
};

export default withPageListLayout(Genres);