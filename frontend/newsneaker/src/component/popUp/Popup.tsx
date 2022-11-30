import React from "react";
import { CountItem, Sort } from "../../reduce/slice/filters/types";
import './popup.scss';


export const sortList = [

    { name: 'По умолчанию', value : ''},
    { name: 'По возрастанию цены', value : 'price_ASC'},
    { name: 'По убыванию цены', value : 'price_DESC'},
    
  ];

export const countItem = [
    { name: 'Показанно: 3', value : '3'},
    { name: 'Показанно: 5', value : '5'},
    { name: 'Показанно: 6', value : '6'},
]  

type PopupProps={
    sort:any;
    setSort:(select:any)=>void;
}

type SettState={
    list:CountItem[]|Sort[];
    defaultValue:string|number;
}

export const Popup:React.FC<PopupProps> = React.memo(({sort,setSort})=>{

    const sortRef = React.useRef(null);
    const [open,setOpen] = React.useState(false);
    const [settings,setSet]=React.useState<SettState>({list:[],defaultValue:''});

    React.useEffect(()=>{
    if(!Number.isNaN(parseInt(sort.value))){
        setSet({...settings, list : countItem, defaultValue : 'Количество товара'})
    }else{
        setSet({...settings, list : sortList, defaultValue : 'Сортировка'})
    }
    },[]);
    

    const block=()=>{
        if(open){
                    const l = settings.list.map((s:any,i)=>{
                               return <li className="li-pop" onClick={()=>setSort(s)} key={s.name}>{s.name}</li>
       
                           })
            return l;
                    
        }else{
            return '';
        }
    }

    return(
        <div id="sortRef" ref={sortRef} className='sort'>
            
            <div className="sort__label" onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)} >
            <div className="custom-select-container">
                 <div className="select-text">{ sort.name}</div>

                {open && <ul className="select-options">{block()}</ul>}                
            </div>
            </div>
        </div>
    );
});


