import React from "react";
import '../checkbox/checkbox.scss'

type CheckboxProps={
  onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void;
  value: string;
  checked:boolean;
  label:string;
}


export const Checkbox:React.FC<CheckboxProps> = ({onChange,value,checked,label})=> {
  let checkedClass=checked?'checked':'';

  const handelChacked=(e:React.ChangeEvent<HTMLInputElement>)=>{
    onChange(e);
  }

 
    return (
      <label className={`checkbox checkbox__${checkedClass}`}>
        <input 
          name={value}
          type='checkbox'
          value={value}
          checked={checked}            
          // checked={checked? checked : isChacked}            
          onChange={handelChacked}
        />
        <span className={`icon icon__${checkedClass}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
        </span>
        <span className='text'>{label}</span>
       </label>
    )
}