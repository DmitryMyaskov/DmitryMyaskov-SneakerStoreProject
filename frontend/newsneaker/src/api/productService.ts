import { Location } from "react-router-dom";
import { Sort } from "../reduce/slice/filters/types";

export type UrlParam={
    colors: string[];
    sort: Sort;
    min:number;
    max:number;
    searchValue:string;
    location:Location;
    status: string;
    brands:string[];
}


export const parseUrlSearch=(urlParam:UrlParam)=>{
    const{colors,searchValue,min,max,sort,status,location,brands}=urlParam;

    let url="http://localhost:8080/product/search?";
    let searchParam=searchValue.length>0?`search=${searchValue}` : '';
    let colorsParam=colors.length===0? '' : `&color=`+colors.join("&color=");
    let sortParam=sort.name==='По умолчанию'?'': sort.value.length===0?'' :`&sortedBy=${sort.value}`
    let priceParam= min===0 && max===46000?'':`&min=${min}&max=${max}`;
    let statusParam = status==='main'|| status==='search'?'':`&status=${status}`;
    let brandsParam = brands.length===0? '' : `&brand=`+brands.join("&brand=");

        if(location.pathname!=='/dashboard/search'){
            searchParam='';
            // dispatch(changeSearchValue(''));    
        }
    return url+=searchParam+colorsParam+sortParam+priceParam+statusParam+brandsParam;    
}




