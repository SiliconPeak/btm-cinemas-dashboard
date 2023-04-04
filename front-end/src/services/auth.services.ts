const authHeader = () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if(user && user.token) {
           return {
               "authorization":`Bearer ${user.token}`,
               "Content-Type":"application/json"
           }
        } 
        return {
            "Content-Type":"application/json"
        };
}

const login = async ({usrEmail,usrPassword}:{usrEmail:string,usrPassword:string}) => {
    const res = await fetch('http://localhost:9003/api/v1/login',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({usrEmail,usrPassword})
    });

    const data =await res.json();
    if(data && data.status === 200) {
        localStorage.setItem("user",JSON.stringify({token:data.token}));
    }
    return data;
};

const getCurrentUser = () => {
   return JSON.parse(localStorage.getItem('user') || 'null');
};

const logout = () => {
    localStorage.removeItem('user');
}

const authService  = {
    login,
    getCurrentUser,
    logout,
    authHeader
};

export default authService;