import React from "react";
import { Checkbox } from "../../generetic/checkbox/Checkbox";

type BrandProps={
    setBrands:(newBrands:string[])=>void;
    brands:string[];
}

export const Brand:React.FC<BrandProps>=React.memo(({setBrands,brands})=>{
    const[open,setOpen]=React.useState(false);
    const listBrands=['Nike','Nike SB',"adidas Originals","Puma","Reebok","Jordan","New Balance","Converse"];

    
    function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
        const checked=e.target.checked;
        const name=e.target.name;
        let newList=[...brands];
        if(!checked){
            newList=newList.filter((b)=>b!==name);
        }else{
            let index = newList.indexOf(name);
            if(index===-1){
                newList=[...newList,name];
            }
        }
        setBrands(newList);
    }

    return(
        <React.Fragment>
        <div
        className={"catalog-filtres__box catalog-filtres__box"+`${open?'--open' : ''}`}>
            <h5 onClick={()=>setOpen(!open)} className="catalog-filtres__box-title">Бренды</h5>
            {open && <div className="block-brand"> {listBrands.map((brand)=>{
                return <Checkbox 
                        onChange={handleChange} 
                        key={brand} 
                        checked={!!brands.find((b)=>b===brand)} 
                        value={brand} 
                        label={brand}/>
            })}</div>}
            
        </div>
        </React.Fragment>
    );
});