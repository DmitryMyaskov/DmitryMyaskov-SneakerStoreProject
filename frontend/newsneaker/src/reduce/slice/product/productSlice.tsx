import {createSlice } from '@reduxjs/toolkit';
import { fetchProduct } from './asyncAction';
import { ProductSliceState } from './types';


const initialState : ProductSliceState = {
    isFetching : false,
    totalPages: 1,
    pageNumber: 0,
    product: []
}


const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setItems(state){
      state.product=[];
      state.isFetching=false;
    },
    setLoading(state){
      state.isFetching=true;
    }
  },
    extraReducers: (builder) => {
      builder.addCase(fetchProduct.pending, (state) => {
        state.isFetching = true;
        state.product = [];
      });
  
      builder.addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload.product;
        state.pageNumber=action.payload.pageNumber;
        state.totalPages=action.payload.totalPages;
        state.isFetching = false;
      });

  },
})

export const{setLoading,setItems}=productSlice.actions;
export default productSlice.reducer;

