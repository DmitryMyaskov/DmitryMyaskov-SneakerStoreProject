import { useSelector } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from './pages/loginPage/LoginPage';
import Dashboard from './pages/dashboard/Dashboard';
import RequireAuth from './requireAuth/RequireAuth';
import { ShopingCart } from './pages/shopingCart/ShopingCart';
import { RootState } from '.';



function App() {
  const logined = useSelector((state:RootState)=>state.auth);



  return (
    <div className="App">

    <BrowserRouter>
      <Routes>

        <Route path='/' element={logined.auth===true ? <Navigate to='/dashboard' /> : <LoginPage/>}/>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path='dashboard/*' element={<Dashboard />}/>
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
          <Route path='/cart' element={<ShopingCart/>}/>
        </Route>


      </Routes>
      </BrowserRouter>
      
     


    </div>
  );
}

export default App;
