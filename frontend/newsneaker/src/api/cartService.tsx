import axios from 'axios';
import { getToken } from './authentificateService';
import { setAuthOut } from '../reduce/slice/auth/authSlice';
import { setCart, setClearCart, setMinus, setRemove, setUpdateCart } from '../reduce/slice/cart/cartSlice';
import { appDispatch } from '..';
import { Product } from '../reduce/slice/product/types';
import { CartSliceState } from '../reduce/slice/cart/types';


const mappingCart='http://localhost:8080/cart/';


export const addItem=(cart: CartSliceState ,product : Product)=> async (dispatch : appDispatch)=>{
    try{
        const url1 = `${mappingCart}${cart.cartId}/add/${product.selectSize.id}`;
        console.log(url1);
        await axios({
            method : 'get',
            url : url1,
            headers : {'Authorization': 'Bearer '+getToken()}          
        });
        dispatch(setCart({product:product,cartId: cart.cartId}));
    }catch(error){
        if(axios.isAxiosError(error) && error.response?.status===401) dispatch(setAuthOut());
        dispatch(setAuthOut());
    }       
}


export const increase=(cart: CartSliceState ,product : Product) => (dispatch : appDispatch) => {
    dispatch(setCart({product:product,cartId: cart.cartId}));   
}



export const decrease=(cart: CartSliceState ,product : Product) => async(dispatch : appDispatch) => {      
        if(product.quantity-1!=0){
           dispatch(setMinus(product));
        }
} 



export const removeItem = (cartId: number,product: Product) => async (dispatch : appDispatch) => {
        try{
            const url = `${mappingCart}${cartId}/remove/${product.selectSize.id}`;
            await axios({
                method : 'get',
                url : url,
                headers : {'Authorization': 'Bearer '+getToken()}          
            });
            dispatch(setRemove(product));
        }catch(error){
            if(axios.isAxiosError(error) && error.response?.status===401) dispatch(setAuthOut());
        }
}


export const checkout=(cart: CartSliceState) => async(dispatch : appDispatch) => {
    try{
    const size={id : cart.cartId, products : [...cart.products.map((s)=>s.selectSize)]};
    const json = JSON.stringify(size);

    const url = `${mappingCart}${cart.cartId}/order`;
    await axios({
        method : 'post',
        url : url,
        headers : {'Authorization': 'Bearer '+getToken(),'Content-Type': 'application/json'},
        data : json
    });
    dispatch(setClearCart(cart.cartId));
    }catch(error){
        if(axios.isAxiosError(error) && error.response?.status===401) dispatch(setAuthOut());
    }
}

export const clearCartService = (cart : CartSliceState) => async (dispatch : appDispatch) => {
    try{
    const url = `${mappingCart}${cart.cartId}/clear`;
    await axios({
        method : 'delete',
        url : url,
        headers : {'Authorization': 'Bearer '+getToken()},
    });
    dispatch(setClearCart(cart.cartId));
    }catch(error){
        if(axios.isAxiosError(error) && error.response?.status===401) dispatch(setAuthOut());
    }
}

export const updateCart = (cart: CartSliceState) => async (dispatch : appDispatch) => {
    try{
    const url = `${mappingCart}${cart.cartId}`;
    const response = await axios({
        method : 'get',
        url : url,
        headers : {'Authorization': 'Bearer '+getToken()},
    });
    dispatch(setUpdateCart(response.data));
    }catch(error){
        if(axios.isAxiosError(error) && error.response?.status===401) dispatch(setAuthOut());
    }
}