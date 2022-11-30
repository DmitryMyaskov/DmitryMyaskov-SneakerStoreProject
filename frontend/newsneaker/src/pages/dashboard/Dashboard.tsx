import React from 'react';
import '../../component/productContainer/catalog.scss';
import {Route, Routes, useLocation} from "react-router-dom";
import { CatalogProducts } from '../../component/productContainer/CatalogProducts';
import { Header } from '../../component/header/Header';


export const Dashboard: React.FC=()=>{
  const location = useLocation();
  

    return(
      <div>
        <Header/>
        <div className='catalogProduct'>
          
        {location.pathname==='/dashboard/'||location.pathname==='/dashboard'?<CatalogProducts name={'Главная'} status={'main'}/>:  
        <Routes>
              <Route path='new' element={<CatalogProducts name={'Новинки'} status={'new'}/>}/>
              <Route path='search' element={<CatalogProducts name={'Поиск'} status={'search'}/>}/>
              <Route path='sale' element={<CatalogProducts name={'Распродажа'} status={'sale'}/>}/>
        </Routes>}
        </div>
        </div>
    );
}

export default Dashboard; 