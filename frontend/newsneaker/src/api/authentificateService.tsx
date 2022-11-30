import axios from "axios";
import { LoginParam } from "../pages/loginPage/LoginPage";




export const getToken=()=>{
    return localStorage.getItem('USER_KEY');
}



export const clearLocalStorage =()=>{
    localStorage.clear();
    window.location.reload();
}


export const userLogin = (data:LoginParam)=>{
    return axios({
        method:'post',
        url :`${process.env.hostUrl||'http://localhost:8080'}/auth/login`,
        data : data
    }); 
}
