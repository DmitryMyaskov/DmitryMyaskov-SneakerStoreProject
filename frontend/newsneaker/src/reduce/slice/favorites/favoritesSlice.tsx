import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../product/types";

const initialState:FavoritesSliceState={
    favorites : [],
}

export type FavoritesSliceState={
    favorites : Product[];
}

const favoritesSlice=createSlice({
    name : 'favorites',
    initialState,
    reducers:{
        setFavorites(state,action){
            // const favoritesId=action.payload.favoritesId;
            const favoritesDTO=action.payload;
            state=favoritesDTO;
        },
        setAddFavorites(state,action){
            state.favorites.push({...action.payload});
        },
        setMinusFavorites(state,action){
            state.favorites=state.favorites.filter((f) => f.productId!=action.payload.productId);
        }
    }
})

export const{setFavorites,setAddFavorites,setMinusFavorites} = favoritesSlice.actions;
export default favoritesSlice.reducer;