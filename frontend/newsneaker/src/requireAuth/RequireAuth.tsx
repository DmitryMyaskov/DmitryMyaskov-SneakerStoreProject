import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from '..';
import { Authority } from '../reduce/slice/auth/types';

type ReqAuthProps={allowedRoles:string[]}



const RequireAuth:React.FC<ReqAuthProps> = ( {allowedRoles} ) => {
    const {user}=useSelector((state:RootState)=>state.auth);
    return (
        
    user?.authorities.find((role:Authority)=>allowedRoles.includes(role.role))? <Outlet />: <Navigate to={'/'} replace={true}/>
    
    );
}

export default RequireAuth;
