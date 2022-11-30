import { useState,useEffect } from "react";
import '../button/button.scss';

export const Button=({value,onClick})=>{
  const[coor,setCoor]=useState({x:0,y:0});

  useEffect(()=>{
    const el = document.getElementById(value);

    el.addEventListener('mousedown',moveMouse);
    return ()=> el.removeEventListener('mousedown',moveMouse);

  },[])


  function moveMouse(event){
    setCoor({x:event.clientX-event.target.offsetLeft, y:event.clientY-event.target.offsetTop});
  }

  function handelClick(){
    onClick();
  }

    return(
        <div onClick={handelClick} className='bottom'>
            <a id={value} className='push' style={{'--x': coor.x+'px','--y': coor.y+'px'}}><span>{value}</span></a>
        </div>
    );
}