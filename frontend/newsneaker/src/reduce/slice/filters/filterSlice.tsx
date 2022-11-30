import { createSlice} from '@reduxjs/toolkit';
import { FilterSliceState } from './types';


const initialState:FilterSliceState = {
    min : 0,
    max : 30000,
    colors : [],
    sort : {name: 'По умолчанию', value : ''},
    countItem: {name: "Показанно: 3", value: 3},
    searchValue : '',
    brands:[],
  };


  
  const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
      setPrice(state, action) {
        state.min = action.payload.min;
        state.max = action.payload.max;
      },
      setColor(state,action){
        state.colors=action.payload;
      },
      setSort(state,action){
        state.sort=action.payload;
      },
      setCountItem(state,action){
        state.countItem=action.payload;
      },
      setSearchValue(state,action){
        console.log(action.payload);
        state.searchValue=action.payload;
      },
      setBrands(state,action){
        state.brands=action.payload;
      },
      setRest(state){
        state.colors=initialState.colors;
        state.max=initialState.max;
        state.min=initialState.min;
        state.brands=initialState.brands;
      }
    },
  });
  
export const{setPrice,setColor,setSort,setCountItem,setSearchValue,setRest,setBrands}=filterSlice.actions;
export default filterSlice.reducer;