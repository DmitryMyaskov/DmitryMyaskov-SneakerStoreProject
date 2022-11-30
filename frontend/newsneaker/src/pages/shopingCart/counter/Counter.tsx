import { Button } from "../../../generetic/button/Button";
import { Product } from "../../../reduce/slice/product/types";
import './counter.scss';


type CounterProps={
  product:Product;
  increace : (product:Product)=>void;
  reduce : (product:Product)=>void;
  remove : (product:Product)=>void;
}

export const Counter:React.FC<CounterProps> = ({product,increace,reduce,remove})=>{
    return(
    <div className="cart">
    <div className="cart__item">

    <div className='cart__item-img'>
      <img className="block__image" src={product.img} />
    </div>
      
    <div className="cart__item-info">
      <h3>{product.brand}</h3>
      <p>{product.model}</p>
      <p>размер: {product.selectSize.size}</p>
    </div>
    <div className='counter'>
    <span>Осталось: {product.selectSize.quantity}</span>
    <div className="cart__item-count">
      <svg onClick={()=>reduce(product)} height={40} width={40} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    <b>{product.quantity}</b>
      <svg onClick={()=>increace(product)} height={40} width={40} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    </div>
    <div className="cart__item-price">
      <b>{product.price}</b>
    </div>
    <Button onClick={()=>remove(product)} value={'Удалить'}/>
  </div>
  </div>
  );
}



