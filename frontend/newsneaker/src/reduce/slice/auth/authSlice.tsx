import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { fetchProduct } from '../product/asyncAction';
import { authSliceState, User } from './types';

const initialState:authSliceState={
    user : null,
    err : '',
    loading : false, 
    auth:false,
}



const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setAuthSuc(state,action:PayloadAction<User>){
            const user = action.payload;
            localStorage.setItem('USER_KEY',user.jwt)
            state.auth=true;
            state.loading=true;
            state.user=user;
            state.err='';
        },
        setAuthOut(state){
            state=initialState;
        }
      },extraReducers :(builder)=>{
        builder.addCase(fetchProduct.rejected,(state)=>{
            state.user=null;
            state.auth=false;
            state.err='';
            state.loading=false;
        });
      }
    }
)
export const {setAuthSuc,setAuthOut} =authSlice.actions
export default authSlice.reducer;
