import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux/es/exports';
import './index.scss';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import auth from './reduce/slice/auth/authSlice';
import cart from './reduce/slice/cart/cartSlice';
import filters from './reduce/slice/filters/filterSlice';
import product from './reduce/slice/product/productSlice';
import favorites from './reduce/slice/favorites/favoritesSlice';

 

const saveToLocalStorage=(state: RootState)=>{
  try {
    localStorage.setItem('state', JSON.stringify({auth: state.auth,cart: state.cart, favorites : state.favorites}));
  } catch (e) {
    console.error(e);
  }
}

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state');
    return stateStr ? JSON.parse(stateStr) : undefined;

  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const removeToLocalStorage=()=>{
  localStorage.removeItem("state");
}

export const store = configureStore({
  reducer: {
    auth,
    cart,
    filters,
    product,
    favorites
  },
  preloadedState: loadFromLocalStorage(),
});

export type RootState = ReturnType<typeof store.getState>

export type appDispatch = typeof store.dispatch;


store.subscribe(()=>saveToLocalStorage(store.getState()));
const rootElement =document.getElementById('root');
if(rootElement){
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <Provider store={store}>
       <App/>
      </Provider>
    );}

