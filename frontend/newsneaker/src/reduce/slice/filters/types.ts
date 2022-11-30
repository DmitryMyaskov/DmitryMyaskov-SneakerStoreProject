export interface FilterSliceState{
    min : number,
    max : number,
    colors : string[],
    sort : Sort,
    countItem: CountItem,
    searchValue : string,
    brands: string[],
}

export type Sort={
  name:string;
  value:string;
}

export type CountItem={
  name:string;
  value:number;
}