import { Cart } from "../cart/types";
import { Product } from "../product/types";

export type UserDto={
    id:number;
    login:string;
    password:string;
    authorities:Authority[];
    jwt:string;
    shopCartDto: Cart;
    favoritesDTOS: Product;
  }

  export type User={
    id:number;
    login: string;
    password: string;
    authorities :Authority[];
    jwt:string;
}

export type Authority={
  id:number;
  role:string;
  authority:string;
}

export interface authSliceState{
    user: User|null;
    err:string;
    loading:boolean;
    auth:boolean;
}