import React from "react";
import { Checkbox } from "../../generetic/checkbox/Checkbox";


type ColorProps={
    colorsSelect:string[];
    setColors:(newList:string[])=>void;
}

export const Color:React.FC<ColorProps>=React.memo(({colorsSelect,setColors})=>{
    const[open,setOpen]=React.useState(false);
    const colors = [{name :'Красный',value:'red'},{name:'Зеленный',value:'green'},{name:'Синий',value:'blue'},
    {name:'Черный',value:'black'},{name:'Розовый',value:'pink'},{name:'Белый',value:'white'},
    {name:'Серый',value:'grey'}];



    function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
        const checked=e.target.checked;
        const name=e.target.name;
        let newList=[...colorsSelect];
        if(!checked){
            newList=newList.filter((b)=>b!==name);
        }else{
            let index = newList.indexOf(name);
            if(index===-1){
                newList=[...newList,name];
            }
        }
        setColors(newList);
    }

    return(
        <React.Fragment>
        <div
        className={"catalog-filtres__box catalog-filtres__box"+`${open?'--open' : ''}`}>
            <h5 onClick={()=>setOpen(!open)} className="catalog-filtres__box-title">Цвет</h5>
            {open && <div className="color-box">
                        {colors.map((color)=>
                            {
                            return <Checkbox
                            onChange={handleChange} 
                            key={color.value} 
                            // checked={false}
                            checked={!!colorsSelect.find((b)=>b===color.value)} 
                            value={color.value} 
                            label={color.name}
                            />
                            })}
                     </div>
            }
        </div>
        </React.Fragment>
    );
});