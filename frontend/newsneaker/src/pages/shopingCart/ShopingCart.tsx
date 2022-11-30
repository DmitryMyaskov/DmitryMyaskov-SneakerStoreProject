import './ShopingCart.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkout, clearCartService, decrease,increase,removeItem, updateCart} from '../../api/cartService';
import { appDispatch, RootState } from '../..';
import { Product } from '../../reduce/slice/product/types';
import { Counter } from './counter/Counter';




export const ShopingCart:React.FC=()=>{
  const cart=useSelector((state:RootState)=>state.cart);
  const dispatch = useDispatch<appDispatch>();

  useEffect(()=>{
    const interval=setInterval(() => {
      dispatch(updateCart(cart));
    }, 120000);
    return ()=>clearInterval(interval);
  },[]);


  
  const removeProduct=(product:Product)=>{
    dispatch(removeItem(cart.cartId,product));
  }


  const increace=(product:Product)=>{
    dispatch(increase(cart,product));
  }

  const reduce=(product:Product)=>{
    dispatch(decrease(cart,product));
  }

const checkoutCart = () =>{
  dispatch(checkout(cart));
}

const clearCart=()=>{
  dispatch(clearCartService(cart));
}

   
const calcProduct=()=>{
  let count=0;
  let sum=0;

  cart.products?.map((p,i)=>{
    count+=p.quantity
    sum+=p.quantity*p.price;
  });
  return {count : count, sum : sum};
}

    return(
        <div className='cart-body'>
          <div className="cart-container">
          <h3 className='title'>Корзина</h3>
            <div className='header'>
              <span onClick={clearCart} className='clear-cart'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#aad0fb" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                Очистить корзину
              </span>
            </div>
            {cart.products?.map((pro,index)=>{
              return <Counter increace={increace} reduce={reduce} remove={removeProduct} key={index} product={pro}/>
            })
            }
            <div className='cart-bottom'>
              <div className='cart-bottom__details'>
                <span>
                  Всего наименования:<b>{calcProduct()["count"]} шт.</b>
                </span>
                <span>
                  Сумма заказа: <b>{calcProduct()["sum"]} р.</b>
                </span>
              </div>
              <div className='cart-bottom__buttons'>
                <button className="button__outline"><a href='/'>Вернуться назад</a></button>
                <button className="button__outline" onClick={ checkoutCart }>Оформить заказ</button>
              </div>
            </div>

          </div>
        </div>
    );
};