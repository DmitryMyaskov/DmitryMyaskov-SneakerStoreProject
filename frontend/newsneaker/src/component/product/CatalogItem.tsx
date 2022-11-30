import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { appDispatch, RootState } from "../..";
import { addFavorites, deleteFavorites } from "../../api/favoritesService";
import { Product, SizeField } from "../../reduce/slice/product/types";
import { Size } from "./Size";

type CatItem={
    product: Product;
    add: (product:Product)=>void;
}


export const CatalogItem:React.FC<CatItem>=React.memo(({product,add})=>{
    const dispatch=useDispatch<appDispatch>();
    const {favorites} = useSelector((state:RootState)=>state.favorites);
    const fillOrNone = favorites.find((f) => f.productId===product.productId)?'red':'none';
    const [open,setOpen]=React.useState(false);



    function likeProduct() {
        if(fillOrNone==='red'){
            dispatch(deleteFavorites(2,product));
        }else{
            dispatch(addFavorites(2,product));
        }
    }

    function addItem(size:SizeField) {
        const productAndSize={...product,selectSize : size};
        add(productAndSize);
    }

    const sizeBlock =
                    <div className="cont">
                        <div className={open? 'cont__size cont__size--show' : 'cont__size'}>

                        <h5 className="product-card product-card__title">
                        <a className="product-card__link" href="/shoes/sneakers/4-retro-se-DH7138-506/" title="Кроссовки Jordan 4 Retro SE">
                        Кроссовки {product.brand+" "+product.model}
				        </a>
                        </h5>

                        <div className="sizeblock sizeblock__price">
                           <span className={product.sale?'sizeblock__price--sale': 'sizeblock__price'}>
                           {product.sale?Math.round(product.price/((100-product.sale)/100)) : product.price}
                           </span>
                           {product.sale?<span style={{color : 'red'}}> {product.price}₽</span>:<i>₽</i>}
                        </div>

                        <div className="sizeblock">
                           {product.sizes.map((s:SizeField)=>{
                                return <Size key={s.id} add={addItem} size={s}/>
                           })}
                        </div>
                        </div>
                    </div>

    return(
        <div className="product-cards__item">
            <div className="product-card" onMouseEnter={()=>setOpen(!open)} onMouseLeave={()=>setOpen(!open)}>
                    <div className="product-card__image">
				        <div className="product-card__image-inner">
					        <picture className="image-wrapper image-wrapper--loaded">
                            <source
                             media=""
                             srcSet={product.img+' 592w'}
                             sizes="(max-width: 770px) 296px,
                                    (max-width: 1720px) 592px"
                             />
							<img src="https://sneakerhead.ru/local/templates/sm/images/blank.gif" alt="Кроссовки Jordan 4 Retro SE" className="loaded" />
							</picture>
				        </div>
				        <div className="product-card__labels product-card__labels--top-left">
						    <span className="product-label product-label--new">
                                {product.status==='sale'? `-${product.sale}%` : product.status==='new'? 'Новинка':''}
                            </span>
					    </div>
                        <svg onClick={likeProduct} xmlns="http://www.w3.org/2000/svg" fill={fillOrNone} viewBox="0 0 24 24" strokeWidth={1.5} stroke="red">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>;   
			        </div>
                <div className='prod'>
                <h5 className="product-card product-card__title">
                    <a className="product-card__link" href="/shoes/sneakers/4-retro-se-DH7138-506/" title="Кроссовки Jordan 4 Retro SE">
                        Кроссовки {product.brand+" "+product.model}
				    	<span className="product-card__link-area"></span>
				    </a>
                </h5>
                <div className="product-card product-card__price">
                    <span className={product.sale?'product-card__price--sale': 'product-card__price'}>
                        {product.sale?Math.round(product.price/((100-product.sale)/100)): product.price}
                    </span>
                        {product.sale && <span style={{color : 'red'}}> {product.price}</span>}
                    <i>₽</i>
                </div>
                </div>
                {sizeBlock}
            </div>
        </div>
    );
});