import { createSlice, current, PayloadAction} from '@reduxjs/toolkit';
import { UserDto } from '../auth/types';
import { Product} from '../product/types';
import { CartSliceState,CartAction } from './types';


const initialState: CartSliceState={
    products:[],
    cartId: 0,
    isLoading:false,
}



const filterSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      setUpdateCart(state,action:PayloadAction<UserDto>){
        const cartProducts = action.payload.shopCartDto.products;
        const cartId = action.payload.shopCartDto.id;
        state.products = cartProducts;
        state.cartId = cartId;
      },
      setCart(state,action:PayloadAction<CartAction>){
        const findItem = state.products.find((obj) => obj.productId === action.payload.product.productId && 
        obj.selectSize.id===action.payload.product.selectSize.id);

        if(findItem){
          findItem.quantity++;
          const selectSize={...findItem.selectSize}
          selectSize.quantity--;
          selectSize.stock+=1;
          findItem.selectSize=selectSize;
        }else{
          const product={...action.payload.product};
          const selectSize={...product.selectSize, stock :1};
          selectSize.quantity--;
          state.products.push({
            ...action.payload.product,
            quantity:1,
            selectSize : selectSize
          });
        }
        state.isLoading=true;
      },
      setRemove(state,action:PayloadAction<Product>){
        const sizeId=action.payload.selectSize.id;

        const newProducts=state.products.filter((obj) =>{
          if(obj.selectSize.id!==sizeId){
            return obj;
          }
        });
        state.products=newProducts;
      },
      setMinus(state,action:PayloadAction<Product>){
        const minus = action.payload;
        const findItem =state.products.find((obj) => obj.productId===minus.productId && 
        obj.selectSize.id===action.payload.selectSize.id);


        if(findItem){
          findItem.quantity--;
          const selectSize={...findItem.selectSize}
          selectSize.quantity++;
          selectSize.stock-=1;
          findItem.selectSize=selectSize;
        }
      },
      setClearCart(state,action:PayloadAction<number>){
        state.products=initialState.products;
        state.cartId=action.payload;
        state.isLoading=initialState.isLoading;
        console.log("clear");
      }
    },
  });


export const{setUpdateCart,setCart,setMinus,setRemove,setClearCart} = filterSlice.actions;

export default filterSlice.reducer;