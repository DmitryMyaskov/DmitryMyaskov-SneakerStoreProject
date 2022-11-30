import React from "react";
import { Fragment } from "react";
import { Brand } from "./Brand";
import { Color } from "./Color";
import { Price } from "./Price";


type SideFilterProps={
    reset: ()=>void;
    setPushPrice: (pushPrice:boolean)=>void;
    pushPrice: boolean;
    price: number[];
    setPrice: (price:number[])=>void;
    setBrands: (brands: string[])=>void;
    brands: string[];
    colors: string[];
    setColors: (colors: string[])=>void;
}

export const SideFilter:React.FC<SideFilterProps>=({reset,setPushPrice,pushPrice,price,setPrice,setBrands,brands,colors,setColors})=>{

    return(
        <Fragment>
            <div className="group">
                <button className="group__button" onClick={reset}>
                    Сбрость фильтр
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <Brand setBrands={setBrands} brands={brands}/>
                <Color colorsSelect={colors} setColors={setColors}/>
                <Price pushPrice={pushPrice} setPushPrice={setPushPrice} price={price} setPrice={setPrice}/>
            </div>
        </Fragment>
    );
};
