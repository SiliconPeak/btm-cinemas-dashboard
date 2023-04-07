import { GenreCreateType } from "../lib/types";

const getAll = async () => {
    try {
        const res = await fetch('http://localhost:9003/api/v1/genres',{
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

const createGenre = async (body:GenreCreateType) => {
    try {
        const res = await fetch('http://localhost:9003/api/v1/genres',{
            method:'POST',
            headers:{
                "Content-Type":'application/json',
            },
            body:JSON.stringify(body)
        });
        const data = await res.json();
        if(data && data.status === 200) {
            return data;
        }
    } catch(err) {
        alert(err);
    }
};

const deleteGenre = async (genreid:string) => {
    try {
        const res = await fetch(`http://localhost:9003/api/v1/genres/${genreid}`,{
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
const getGenreById =  async (genreid:any) => {
    try {
        const res = await fetch(`http://localhost:9003/api/v1/genres/${genreid}`,{
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

const editGenre = async (id:any,body:any) => {
    try {
        const res = await fetch(`http://localhost:9003/api/v1/genres/${id}`,{
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

export const genreServices = {
    getAll,
    createGenre,
    deleteGenre,
    getGenreById,
    editGenre
};