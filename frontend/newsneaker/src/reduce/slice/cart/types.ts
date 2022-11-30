import { Product } from "../product/types";

export type Cart={
    id : number;
    products : Product[];
}

export type CartAction={
    product : Product;
    cartId : number;
  }

  export interface CartSliceState{
    products : Product[];
    cartId : number;
    isLoading : boolean;
  }