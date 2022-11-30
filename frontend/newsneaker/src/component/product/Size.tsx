import React from "react"
import { useSelector } from "react-redux";
import { RootState } from "../..";
import { SizeField } from "../../reduce/slice/product/types";

type SizeProps={
    add: (size:SizeField)=> void;
    size: SizeField;
}

export const Size:React.FC<SizeProps>=React.memo(({add,size})=>{
    const {products}=useSelector((state:RootState)=>state.cart);

    
    const findProduct = products?.find((p) => p.selectSize.id===size.id);
    const inCart =(s:SizeField)=>{
        if(!findProduct) add(s);
    }
    return (
        <div> 
            <span onClick={()=>inCart(size)} className={findProduct?'size size-select' : 'size'}>{size.size}EU</span>
        </div>
    );


});