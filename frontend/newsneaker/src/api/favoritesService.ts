import axios from "axios"
import { appDispatch } from "..";
import { setAuthOut } from "../reduce/slice/auth/authSlice";
import { User } from "../reduce/slice/auth/types";
import { setAddFavorites, setFavorites, setMinusFavorites } from "../reduce/slice/favorites/favoritesSlice";
import { Product } from "../reduce/slice/product/types";
import { getToken } from "./authentificateService";


export const getFavorites=(userId:number)=> async (dispatch:appDispatch) => {
    let url=`http://localhost:8080/user/${userId}/favorites/list`

    try{
    const response = await axios({
        method : 'get',
        url : url,
        headers : {'Authorization': 'Bearer '+getToken()}          
    });
    dispatch(setFavorites(response.data));
    }catch(error){
        if( axios.isAxiosError(error) && error.response?.status===401)dispatch(setAuthOut());
    }
}

export const addFavorites=(userId:number,product:Product) => async(dispatch:appDispatch) => {
    let url=`http://localhost:8080/user/${userId}/favorites/add/${product.productId}`
    
    try{
    await axios({
        method : 'put',
        url : url,
        headers : {'Authorization': 'Bearer '+getToken()}          
    });
    dispatch(setAddFavorites(product));
    }catch(error){
        if(axios.isAxiosError(error) && error.response?.status===401)dispatch(setAuthOut());
    }
}

export const deleteFavorites=(userId:number,product:Product) => async (dispatch:appDispatch) =>{
    let url=`http://localhost:8080/user/${userId}/favorites/delete/${product.productId}`
    
    try{
    await axios({
        method : 'delete',
        url : url,
        headers : {'Authorization': 'Bearer '+getToken()}          
    });
    dispatch(setMinusFavorites(product));
    }catch(error){
        if(axios.isAxiosError(error) && error.response?.status===401)dispatch(setAuthOut());
    }
}