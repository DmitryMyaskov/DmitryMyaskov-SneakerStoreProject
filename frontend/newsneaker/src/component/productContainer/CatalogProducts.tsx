import { CatalogItem } from "../product/CatalogItem";
import React from "react";
import './catalog.scss';
import { SideFilter } from "../fillter/SideFilter";
import { useDispatch,useSelector } from "react-redux";
import { parseUrlSearch} from "../../api/productService";
import { useLocation} from "react-router-dom";
import { Popup } from "../popUp/Popup";
import { addItem} from "../../api/cartService";
import Paginator from "../paginator/Paginator";
import { fetchProduct } from "../../reduce/slice/product/asyncAction";
import { setBrands, setColor, setCountItem, setPrice, setRest, setSort} from "../../reduce/slice/filters/filterSlice";
import { CountItem, Sort } from "../../reduce/slice/filters/types";
import { appDispatch } from "../..";
import {RootState} from '../../index';
import { Product } from "../../reduce/slice/product/types";
import { setLoading } from "../../reduce/slice/product/productSlice";
import { Skeleton } from "../product/Skeleton";

 export const state = {
    min : 0,
    max : 46000,
    brand : []
  };

 export type ProductParam={
    total: number;
    page: number;
    url: string;
 }

 type CatalogProps={
  name:string;
  status:string;
 }


export const CatalogProducts: React.FC<CatalogProps>=({name, status})=>{
    const cart=useSelector((state:RootState)=>state.cart);
    const {product,isFetching,pageNumber,totalPages}=useSelector((state:RootState)=>state.product);
    const {min,max,colors,sort,countItem,searchValue,brands}=useSelector((state:RootState)=>state.filters);
    const dispatch = useDispatch<appDispatch>();
    const [pushPrice,setPushPrice]=React.useState(false);
    const location = useLocation();


    React.useEffect(()=>{
      dispatch(setLoading());
      setTimeout(()=>{
        fetchProd();
      },200);
    },[sort,colors,pushPrice,countItem,location,brands]);


    const fetchProd = async()=>{
      const paramsUrl={colors,sort,min,max,searchValue,location,status,brands};
      const url = parseUrlSearch(paramsUrl);
      const params: ProductParam={url:url,page:0,total:countItem.value};
      dispatch(fetchProduct(params));
    }


    const handleSelectPrice=React.useCallback((select:number[])=>{
      const min=select[0];
      const max=select[1];
      dispatch(setPrice({min,max}));
    },[])

    const handleSelectBrand=React.useCallback((select:string[])=>{
      const name=select;
      dispatch(setBrands(name));
    },[]);
  
    const handleSelectColor=React.useCallback((select:string[])=>{
      dispatch(setColor(select));
    },[]);
  
    const handleSelectSort=React.useCallback((select:Sort)=>{
      dispatch(setSort(select));
    },[]);
    const handleSelectCountOnPage=React.useCallback((select:CountItem)=>{
      dispatch(setCountItem(select));
    },[]);

  const add=React.useCallback((product:Product)=>{     
    dispatch(addItem(cart,product));
  },[])

  const rest=React.useCallback(()=>{
    dispatch(setRest());
  },[]);

  const handlePageClick=async (event:number)=>{
    const numPage=event-1;
    const url = parseUrlSearch({colors,sort,min,max,searchValue,location,status,brands});
    const params={url:url,page:numPage,total:countItem.value};
    dispatch(setLoading());
      setTimeout(()=>{
        dispatch(fetchProduct(params));
      },200);
  };


  const all= product?.map((item:Product)=><CatalogItem key={item.productId} add={add} product={item}/>);

  const skeletons = [...new Array(+countItem.value)].map((_, index) =><Skeleton key={index} />);
  

      return(
        <div className="container">
            <div className="catalog">
            <div className="page-header">
                <div className="page-header__left">
                  <h3>{name}</h3>
                </div>
                <div style={{display : 'flex', width : '400px', justifyContent :'space-between'}} className="page-header__left">
                  <div><Popup sort={countItem} setSort={handleSelectCountOnPage}/></div>
                  <div><Popup sort={sort} setSort={handleSelectSort}/></div>
                </div>
            </div>
                <div className="catalog__cols">
    
                  <div className="catalog__col catalog__col--aside">
                    <SideFilter 
                    reset={rest}
                    setBrands={handleSelectBrand }
                    brands={brands}
                    pushPrice={pushPrice}
                    setPushPrice={setPushPrice}
                    price={[min,max]}
                    setPrice={handleSelectPrice}
                    colors={colors}
                    setColors={handleSelectColor}
                    />
                  </div>
    
                  <div className="catalog__col catalog__col--main">  
                      <div className="catalog__products">
                          <div className="product-cards">
                              {/* <Loader isLoading={isFetching}/> */}
                                {isFetching? skeletons : all}
                          </div>
                      </div>
                      <Paginator currentPage={ pageNumber } paginate={handlePageClick} allPage={ totalPages }/>
                  </div>

                </div>
            </div>  
        </div>    
    );


};