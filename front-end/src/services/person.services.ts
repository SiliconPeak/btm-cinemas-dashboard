import { PersonCreateType } from "../lib/types";

const getAll = async () => {
    try {
        const res = await fetch('http://localhost:9003/api/v1/person',{
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

const createPerson = async (body:PersonCreateType) => {
    try {
        const res = await fetch('http://localhost:9003/api/v1/person',{
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

const deletePerson = async (movieRoleId:string) => {
    try {
        const res = await fetch(`http://localhost:9003/api/v1/person/${movieRoleId}`,{
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
const getPersonById =  async (movieRoleId:any) => {
    try {
        const res = await fetch(`http://localhost:9003/api/v1/person/${movieRoleId}`,{
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

const editPerson = async (id:any,body:any) => {
    try {
        const res = await fetch(`http://localhost:9003/api/v1/person/${id}`,{
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

export const personServices = {
    getAll,
    createPerson,
    deletePerson,
    getPersonById,
    editPerson
};