import { useRef } from "react";
import { closestBetweenNums, numTrim } from "../utils/Utils";



export const useRange=(
                       sliderRef:React.RefObject<HTMLDivElement>,
                       onUpdate:(off:number)=>void,
                       push:boolean,
                       setPush:(push:boolean)=>void
                       )=>{

    const offset =useRef([0,100]);

    const onStartMove=(e:React.MouseEvent)=>{
        if(!sliderRef.current) return;

        e.stopPropagation();
        const {width,x : startX}=sliderRef.current.getBoundingClientRect();
        const {pageX : moveX}=e;
        const perc= numTrim(Math.floor((moveX-startX)/width*100),0,100);

        const closet = closestBetweenNums(perc,offset.current[0],offset.current[1]);

        if(offset.current[closet]!==perc){
            
            offset.current[closet]=perc;
            onUpdate(closet);
        }

        const onMouseMove=(e:MouseEvent)=>{
            e.preventDefault();
            const {pageX : moveX}=e;
            const perc= numTrim(Math.floor((moveX-startX)/width*100),0,100);
            if(offset.current[closet]!==perc){
                offset.current[closet]=perc;
                onUpdate(closet);
            }
        }
        const mouseUp=()=>{
            setPush(!push);
            // console.log("down");
            document.removeEventListener('mousemove',onMouseMove);
            document.removeEventListener('mouseup',mouseUp);
        }
        document.addEventListener('mousemove',onMouseMove);
        document.addEventListener('mouseup',mouseUp);
    }
    return {offset,onStartMove}
}


// export const useRange=(sliderRef,onUpdate,push,setPush)=>{
//     const offset =useRef([0,100]);


//     const onStartMove=(e)=>{
//         if(!sliderRef.current) return;

//         e.stopPropagation();
//         const {width,x : startX}=sliderRef.current.getBoundingClientRect();
//         const {pageX : moveX}=e;
//         const perc= numTrim(Math.floor((moveX-startX)/width*100),0,100);

//         const closet = closetBetweensNum(perc,offset.current[0],offset.current[1]);
        

//         if(offset.current[closet]!==perc){
            
//             offset.current[closet]=perc;
//             onUpdate(closet);
//         }

//         const onMouseMove=(e)=>{
//             e.preventDefault();
//             const {pageX : moveX}=e;
//             const perc= numTrim(Math.floor((moveX-startX)/width*100),0,100);
//             if(offset.current[closet]!==perc){
//                 offset.current[closet]=perc;
//                 onUpdate(closet);
//             }
//         }
//         const mouseUp=()=>{
//             setPush(!push);
//             document.removeEventListener('mousemove',onMouseMove);
//             document.removeEventListener('mouseup',mouseUp);
//         }
//         document.addEventListener('mousemove',onMouseMove);
//         document.addEventListener('mouseup',mouseUp);
//     }
//     return {offset,onStartMove}
// }