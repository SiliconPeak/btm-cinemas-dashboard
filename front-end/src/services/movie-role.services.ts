import { MovieRoleCreateType } from "../lib/types";

const getAll = async () => {
    try {
        const res = await fetch('http://localhost:9003/api/v1/movie-role',{
          method:'GET'
        });
        const data = await res.json();
        if(data && data.status === 200) {
            return data;
        }
    }catch(err) {
       alert(err);
    }
};

const createMovieRole = async (body:MovieRoleCreateType) => {
    try {
        const res = await fetch('http://localhost:9003/api/v1/movie-role',{
            method:'POST',
            headers:{
                "Content-Type":'application/json',
            },
            body:JSON.stringify(body)
        });
        const data = await res.json();
        console.log("movie role",data)
        if(data && data.status === 200) {
            return data;
        }
    } catch(err) {
        alert(err);
    }
};

const deleteMovieRole = async (movieRoleId:string) => {
    try {
        const res = await fetch(`http://localhost:9003/api/v1/movie-role/${movieRoleId}`,{
            method:'DELETE'
        });
        const data = await res.json();
        console.log("data",data)
        if(data && data.status === 200) {
            return data;
        }
    } catch(err) {
        alert(err);
    }
};
const getMovieRoleById =  async (movieRoleId:any) => {
    try {
        const res = await fetch(`http://localhost:9003/api/v1/movie-role/${movieRoleId}`,{
            method:'GET'
        });
        const data = await res.json();
        if(data && data.status === 200) {
            return data;
        }
    } catch(err) {
        alert(err);
    }
};

const editMovieRole = async (id:any,body:any) => {
    try {
        const res = await fetch(`http://localhost:9003/api/v1/movie-role/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        });
        const data = await res.json();
        console.log(data);
        if(data && data.status === 200) {
            return data;
        } else {
            throw data.error;
        }
    } catch(err) {
        console.log(err);
    }
};

export const movieRoleServices = {
    getAll,
    createMovieRole,
    deleteMovieRole,
    getMovieRoleById,
    editMovieRole
};