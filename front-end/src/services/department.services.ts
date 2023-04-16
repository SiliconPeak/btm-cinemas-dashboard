import { DepartmentCreateType } from "../lib/types";

const getAll = async () => {
    try {
        const res = await fetch('http://localhost:9003/api/v1/department',{
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

const createDepartment = async (body:DepartmentCreateType) => {
    try {
        const res = await fetch('http://localhost:9003/api/v1/department',{
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

const deleteDepartment = async (DepartmentId:string) => {
    try {
        const res = await fetch(`http://localhost:9003/api/v1/department/${DepartmentId}`,{
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
const getDepartmentById =  async (departmentId:any) => {
    try {
        const res = await fetch(`http://localhost:9003/api/v1/department/${departmentId}`,{
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

const editDepartment = async (id:any,body:any) => {
    try {
        const res = await fetch(`http://localhost:9003/api/v1/department/${id}`,{
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

export const departmentServices = {
    getAll,
    createDepartment,
    deleteDepartment,
    getDepartmentById,
    editDepartment
};