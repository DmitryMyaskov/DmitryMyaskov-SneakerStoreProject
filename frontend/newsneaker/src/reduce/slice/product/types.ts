

export type Product={
    productId : number;
    orderid : number;
    brand : string;
    model : string;
    price : number;
    colors : string[];
    sizes :SizeField[];
    selectSize : SizeField;
    img : string;
    quantity : number;
    sale : number;
    status : string;
  }

  export type SizeField={
    id : number;
    size : string;
    quantity : number;
    stock : number;
  }

  
export interface ProductSliceState{
  isFetching : boolean;
  totalPages: number;
  pageNumber: number;
  product: Product[];
}