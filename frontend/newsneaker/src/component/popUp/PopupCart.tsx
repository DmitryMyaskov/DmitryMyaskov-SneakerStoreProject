import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { appDispatch, RootState } from "../..";
import { removeItem } from "../../api/cartService";
import { Product } from "../../reduce/slice/product/types";
import { ItemPop } from "./ItemPop";
import './popup-cart.scss';

export const PopupCart:React.FC= React.memo(()=>{
    const {products,cartId}=useSelector((state:RootState)=>state.cart);
    const dispatch=useDispatch<appDispatch>();

    
    const calcProduct=()=>{
        let count=0;
        let sum=0;
        products?.map((p)=>{
          count+=p.quantity
          sum+=p.quantity*p.price;
        });
        return sum;
    }

    const removeProduct=(product:Product)=>{
        dispatch(removeItem(cartId,product));
    }
    

    return(
        <div className="popup-cart">
            <div className="itemsContainer">
                {products?.map((item)=>{
                    return <ItemPop item={item} remove={removeProduct} key={item.productId+item.selectSize.size}/>
                })}
            </div>
            <div className="popup-cart__info">
               <div className="price">
                   <p>Итого:</p>
                   <b>{calcProduct()} ₽</b>
               </div>
               <button className="btn-cart">
                   {products?.length>0?<Link to='/cart'>Оформить заказ</Link>:'Выберите кроссовки!'}

               </button>
            </div>
        </div>
    );
});