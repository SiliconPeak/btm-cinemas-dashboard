import withPageListLayout from "../../components/HOC/withPageListLayout";
import MovieRoleTable from "../../components/Table/MovieRoleTable";
import { ReactElement } from "../../lib/types";

const MovieRoles = ():ReactElement => {
    return (
       <MovieRoleTable/>
    );
};
export default withPageListLayout(MovieRoles);
