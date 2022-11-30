import React from "react";
import { Slider } from "../../generetic/slider/Slider";

type PriceProps={
    pushPrice:boolean;
    setPushPrice:(pushPrice:boolean)=>void;
    price: number[];
    setPrice:(price:number[])=>void;
}

export const Price:React.FC<PriceProps>=({pushPrice,setPushPrice,price,setPrice})=>{
    const[open,setOpen]=React.useState(false);


    


    return(
        <React.Fragment>
        <div
        className={"catalog-filtres__box catalog-filtres__box"+`${open?'--open' : ''}`}
        >
            <h5 onClick={()=>setOpen(!open)} className="catalog-filtres__box-title">Цена</h5>
            <div>
            {open && <div style={{marginTop : '30px'}}>
                <Slider 
                 price={price} 
                 setPrice={setPrice}
                 pushPrice={pushPrice}
                 setPushPrice={setPushPrice}
                 />
                     </div>}
            </div>
        </div>
        </React.Fragment>
    );
};