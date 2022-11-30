import './header.scss';
import React, { useRef } from 'react';
import logo from '../../logo.svg';
import { PopupCart } from '../popUp/PopupCart';
import { PopupSearch } from '../popUp/PopupSearch';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../../reduce/slice/product/productSlice';
import { appDispatch, RootState } from '../..';
import { clearLocalStorage } from '../../api/authentificateService';

const brands=['Nike','Adidas Originals','Puma','New Balance','Jordan','Converse','The North Face','Edwin',
'Carhartt','Stussy','Vans','Levis','Reebok','Uniqlo','Funko','Casio','Supreme','DC','Oakely',"Lyle Scott",'Tommy','Lacoste',
'YSl','Polo Ralph',"Fredd Pery",'SB','Helly Hansen','Kangol','Uniqlo',"Daniel Wellington",'AI'];


export const Header:React.FC=React.memo(()=>{
    const location=useLocation();
    const dispatch=useDispatch<appDispatch>();
    const[cart,setCart]=React.useState(false);
    const[search,setSearch]=React.useState(false);
    const[profil,setProfil]=React.useState(false);
    const conRef=useRef<HTMLDivElement>(null);

    const {products} =useSelector((state:RootState)=>state.cart);
    const{favorites}=useSelector((state:RootState)=>state.favorites);

    


    React.useEffect(()=>{
        function clickOn(event:MouseEvent) {
            const element=(event as MouseEvent & {path : Node[]})
            if(conRef.current && !element.path.includes(conRef.current as Node)){
                setProfil(false);
            }        
        }
        document.addEventListener('click',clickOn);
        return ()=> document.removeEventListener('click',clickOn);
    },[])




    function colsFunc(param:number) {
        
        // let rowInCol:number=parseInt(brands.length/param);
        let rowInCol = Math.round(brands.length/param);


        // if((brands.length/param)>parseInt(brands.length/param)){
        //   param+=1; 
        // }

        if((brands.length/param)>Math.round(brands.length/param)){
            param+=1; 
        }



        const col:Array<Array<JSX.Element>>=[];
        let delta=0;
        for(let j=0;j<param;j++){
            let column:Array<JSX.Element>=[];
            for(let i=delta;i<delta+rowInCol && i<brands.length;i++){
                column.push(<li key={brands[i]}>{brands[i]}</li>);
            }
            col.push(column);
            delta+=rowInCol;
        }
        return col;
    }
    function fis() {
        dispatch(setItems());
    }

    return(
        <div className='new-header'>
            <div className="new-header__navbar">
                    <div className='new-header__left'>
                        <div className="new-header__logo">
                                <img width="110px" height="110px" src={logo} alt='sneaker-react'/>
						</div>
                        <nav className="new-header__main-nav main-nav">
                            <ul className='main-nav__list'>
                                <li className="main-nav__item">
                                    <Link onClick={fis} state={{ prevPath: location.pathname}} className='main-nav__link' to='new'>Новинки</Link>
                                </li>
                                <li className="main-nav__item">
                                    <a className="main-nav__link">Бренды
                                    </a>
                                    <div className='main-nav__subnav'>
                                        <div className='container'>
                                            <div className='main_nav__cols'>

                                                <div className='main-nav__col'>
                                                    {
                                                        colsFunc(9).map((col,i)=>{
                                                            return <ul key={i}>
                                                                       {col.map((row)=>row)}
                                                                   </ul>
                                                        })
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="main-nav__item">
                                    <Link onClick={fis} state={{ prevPath: location.pathname}} className='main-nav__link' to='/dashboard/'>Вся обувь</Link>
                                </li>
                                <li className="main-nav__item">
                                    <Link onClick={fis} state={{ prevPath: location.pathname}}  className='main-nav__link' to='sale'>Распродажа</Link>
                                </li>

                            </ul>
                        </nav>  
                    </div>
                    <div className='new-header__right'>
                    <nav className="new-header__main-nav main-nav">
                            <ul className='main-nav__list'>

                                <li className="main-nav__item">
                                    <div >
                                    <a className="main-nav__link">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="30px" width="30px" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="pink" >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                            <circle stroke='black' cx="60" cy="60" r="50"/>
                                        </svg>
                                        <div className='circle'>{favorites?.length}</div>
                                    </a>
                                    </div>
                                </li>

                                <li className="main-nav__item">
                                    <div className='cont-popup' onMouseEnter={()=>setSearch(true)} onMouseLeave={()=>setSearch(false)}>
                                    <a className="main-nav__link" href='/'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="30px" width="30px" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#919090">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                        </svg>
                                    </a>
                                    {search && <PopupSearch />}
                                    </div>
                                </li>

                                <li className="main-nav__item">
                                    <div className='cont-popup' onMouseEnter={()=>setCart(true)} onMouseLeave={()=>setCart(false)}>
                                    <a className="main-nav__link" href='/cart'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="30px" width="30px" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#919090"> 
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                            <circle stroke='black' cx="60" cy="60" r="50"/>
                                        </svg>
                                        <div className='circle'>{products?.length}</div>
                                        
                                    </a>
                                    {cart && <PopupCart/>}
                                    </div>
                                </li>

                                <li className="main-nav__item">
                                   <div ref={conRef} className='profil' onClick={()=>setProfil(!profil)}>Профиль</div>
                                   { profil &&
                                     <div className='profil__cont'>
                                       <div className='profil__cont profil__cont--menu'>
                                           <button  onClick={clearLocalStorage}>Выйти из аккаунта</button>
                                       </div>
                                     </div>  
                                   }
                                </li>
                            </ul>
                        </nav> 
                    </div>
            </div>
        </div>
    );
});


