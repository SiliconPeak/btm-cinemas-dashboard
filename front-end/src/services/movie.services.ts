import { PersonCreateType } from "../lib/types";

const getAll = async () => {
    try {
        const res = await fetch('http://localhost:9003/api/v1/movie',{
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

const createMovie = async (body:any) => {
    try {
        const res = await fetch('http://localhost:9003/api/v1/movie',{
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

const deleteMovie = async (movieId:string) => {
    try {
        const res = await fetch(`http://localhost:9003/api/v1/movie/${movieId}`,{
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
const getMovieById =  async (movieId:any) => {
    try {
        const res = await fetch(`http://localhost:9003/api/v1/movie/${movieId}`,{
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

const editMovie = async (id:any,body:any) => {
    try {
        const res = await fetch(`http://localhost:9003/api/v1/movie/${id}`,{
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

export const movieServices = {
    getAll,
    createMovie,
    deleteMovie,
    getMovieById,
    editMovie
};