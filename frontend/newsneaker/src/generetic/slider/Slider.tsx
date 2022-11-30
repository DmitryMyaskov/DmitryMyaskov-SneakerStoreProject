import composeRefs from "@seznam/compose-react-refs";
import React from "react";
import { useRef } from "react";
import '../slider/slider.scss';
import { numTrim } from "../utils/Utils";
import { composeRef } from "./ComposeRef";
import { useRange } from "./useRange";

type SliderProps={
    pushPrice:boolean;
    setPushPrice:(pushPrice:boolean)=>void;
    price:number[];
    setPrice:(price:number[])=>void;

    onMouseDown?: React.MouseEventHandler<HTMLDivElement>
    onMouseUp?: React.MouseEventHandler<HTMLDivElement>
    onMouseMove?: React.MouseEventHandler<HTMLDivElement>
    onChange?: (value: number) => void
}

export const Slider=React.forwardRef<HTMLDivElement,SliderProps>((props,ref)=>{
    
    const{pushPrice,setPushPrice,price,setPrice,onMouseDown}=props;
    const {min,max}={min:0,max:30000};

    const sliderRef = useRef<HTMLDivElement>(null);


    const calcOffset=(val:number)=>{
        return numTrim(Math.round((val - min) / (max - min) * 100), 0, 100);
    }

    const calcOffsetWidth=()=>{
        return numTrim(Math.round((price[1]-price[0])/(max-min)*100),0,100);
    }


    const updateOffset=(num:number)=>{
        const newInnerValue=[...price];
        newInnerValue[num]=calcOffsetToValue(offset.current[num]);
        if(newInnerValue[0]>newInnerValue[1]){
            newInnerValue.sort((a,b)=>a-b);
        }
        setPrice([newInnerValue[0],newInnerValue[1]]);
    }

    const calcOffsetToValue = (off:number) => {
        return Math.round((max-min)*(off/100)+min);
    }

    const {offset,onStartMove}=useRange(sliderRef,updateOffset,pushPrice,setPushPrice);



    const mouseDownHandler=(e:React.MouseEvent<HTMLDivElement>)=>{
        onStartMove(e);
    }

    return(
        <div className='container-slider'>
        <div ref={composeRef(sliderRef,ref)} className="cont-slider" onMouseDown={mouseDownHandler}>
            <div className='slider'>
                <div className='range' style={{width :`${calcOffsetWidth()}%`, left: `${calcOffset(price[0])}%` }}></div>
                <div className='handle' style={{left : `${calcOffset(price[0])}%`}}>
                    <span className="span">{price[0]}</span>
                </div>
                <div className='handle' style={{left : `${calcOffset(price[1])}%`}}>
                    <span className="span">{price[1]}</span>
                </div>
            </div>
        </div>
        <div className='slider__range'>
                <div className='area'>
                    <span>от</span>
                    <input readOnly={true} value={price[0]+'₽'}/>
                </div>
                <div className='area'>
                    <span>до</span>
                    <input readOnly={true} value={price[1]+'₽'}/>
                </div>
        </div>
        </div>
    );
    });


    
    // export const Slider:React.FC<SliderProps>=({pushPrice,setPushPrice,price,setPrice})=>{
    
    //     const {min,max}={min:0,max:46000};
    
    //     const [innerValue,setInnerValue]=useState([price.min,price.max]);
    //     const sliderRef = useRef(null);
    
    
    //     const calcOffset=(val)=>{
    //         return numTrim(Math.round((val - min) / (max - min) * 100), 0, 100);
    //     }
    
    //     const calcOffsetWidth=()=>{
    //         return numTrim(Math.round((price[1]-price[0])/(max-min)*100),0,100);
    //     }
    
    
    //     const updateOffset=(num)=>{
    //         const newInnerValue=[...price];
    //         newInnerValue[num]=calcOffsetToValue(offset.current[num]);
    
    //         if(newInnerValue[0]>newInnerValue[1]){
    //             newInnerValue.sort((a,b)=>a-b);
    //         }
            
    //         // setInnerValue(newInnerValue);
    //         // const pr={...price,['min']:newInnerValue[0],['max']:newInnerValue[1]};
    //         const pr=[...price];
    //         pr[0]=newInnerValue[0];
    //         pr[1]=newInnerValue[1];
    //         // console.log(pr);
    //         setPrice(pr);
    //     }
    
    //     const calcOffsetToValue = (off) => {
    //         return Math.round((max-min)*(off/100)+min);
    //     }
    
    //     const {offset,onStartMove}=useRange(sliderRef,updateOffset,pushPrice,setPushPrice);
    
    
    
    //     const mouseDownHandler=(e)=>{
    //         onStartMove(e);
    //         onmousedown?.(e);
    //     }
    
    //     // onMouseUp={()=>setPushPrice(!pushPrice)}
    
    //     return(
    //         <div className='container-slider'>
    //         <div ref={composeRef(sliderRef,ref)} className="cont-slider" onMouseDown={mouseDownHandler}>
    //             <div className='slider'>
    //                 <div className='range' style={{width :`${calcOffsetWidth()}%`, left: `${calcOffset(price[0])}%` }}></div>
    //                 <div className='handle' style={{left : `${calcOffset(price[0])}%`}}>
    //                     <span className="span">{price[0]}</span>
    //                 </div>
    //                 <div className='handle' style={{left : `${calcOffset(price[1])}%`}}>
    //                     <span className="span">{price[1]}</span>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className='slider__range'>
    //                 <div className='area'>
    //                     <span>от</span>
    //                     <input readOnly={true} type='text' value={price[0]+'₽'}/>
    //                 </div>
    //                 <div className='area'>
    //                     <span>до</span>
    //                     <input readOnly={true} text='text' value={price[1]+'₽'}/>
    //                 </div>
    //         </div>
    //         </div>
    //     );



    // const onMouseHandler=(e)=>{
    //     if(!sliderRef.current) return;
    //     e.stopPropagation();
    //     const {width,x : startX}=sliderRef.current.target.getBoundingClientRect();
    //     console.log(e.target.getBoundingClientRect());
    //     // console.log(w);
    //     const {pageX : moveX}=e;
    //     const perc= numTrim(Math.floor((moveX-startX)/width*100),0,100);

    //      if(offset.current[0]>offset.current[1]){
    //         //    console.log("switch");
    //            offset.current.sort((a,b)=>a-b);
    //         }

    //     const closet = closetBetweensNum(perc,offset.current[0],offset.current[1]);
        

    //     if(offset.current[closet]!==perc){
            
    //         offset.current[closet]=perc;
    //         updateOffset(closet);
    //     }

    //     const mouseMove=(e)=>{
    //         e.preventDefault();
    //         const {pageX : moveX}=e;
    //         const perc= numTrim(Math.floor((moveX-startX)/width*100),0,100);
    //         if(offset.current[closet]!==perc){
    //             offset.current[closet]=perc;
    //             updateOffset(closet);
    //         }
    //     }

    //     const mouseUp=(e)=>{
    //         document.removeEventListener('mousemove',mouseMove);
    //         document.removeEventListener('mouseup',mouseUp);
    //     }

    //     document.addEventListener('mousemove',mouseMove);
    //     document.addEventListener('mouseup',mouseUp);
    // }

    

    // return(
    //     <div ref={composeRef(sliderRef,ref)} className="cont-slider" onMouseDown={mouseDownHandler}>
    //         <div className='slider'>
    //             <div className='range' style={{width :`${calcOffsetWidth()}%`, left: `${calcOffset(innerValue[0])}%` }}></div>
    //             <div className='handle' style={{left : `${calcOffset(innerValue[0])}%`}}>
    //                 <span className="span">{innerValue[0]}</span>
    //             </div>
    //             <div className='handle' style={{left : `${calcOffset(innerValue[1])}%`}}>
    //                 <span className="span">{innerValue[1]}</span>
    //             </div>
    //         </div>
    //     </div>
    // );
    // }: