import React from "react";
import { Product } from "../../reduce/slice/product/types";


type ItemPopProps={
    item: Product;
    remove: (product:Product)=>void;
}

export const ItemPop:React.FC<ItemPopProps>=React.memo(({item,remove})=>{

    

    return(
        <div className="item">
            <div className="first">
            <img src={item.img}></img>
            <div>
                <p>{item.brand+" "+item.model}</p>
                <p>Размер: {item.selectSize.size}</p>
                <b>{item.price} ₽</b>
            </div>
            </div>
            <svg onClick={()=>remove(item)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
    );
});