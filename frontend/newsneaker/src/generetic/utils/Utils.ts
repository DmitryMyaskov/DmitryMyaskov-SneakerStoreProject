export const numTrim=(value:number,min:number,max:number)=>{
    if(value<min)
      value=min;
    else if(value>=max)
      value=max;
    return value;
}

export const closestBetweenNums=(perc:number,first:number,second:number)=>{
  let f;
  let s;

  if(first<second){
    f=Math.abs(first-perc);
    s=Math.abs(second-perc);
    return f < s ? 0 : 1 ;
  }else{
    f=Math.abs(first-perc);
    s=Math.abs(second-perc);
    return f > s ? 0 : 1 ;
  }
  // let middle=Math.round((second-first)/2+first);
  // if(middle>perc) return 0;
  // else return 1;
  
}