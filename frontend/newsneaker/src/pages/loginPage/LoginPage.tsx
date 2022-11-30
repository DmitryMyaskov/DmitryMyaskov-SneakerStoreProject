import React, { useState } from 'react';
import './loginPage.scss';
import {userLogin} from '../../api/authentificateService';
import { connect} from 'react-redux';
import {useNavigate} from "react-router-dom";
import { setAuthSuc} from '../../reduce/slice/auth/authSlice';
import { setUpdateCart} from '../../reduce/slice/cart/cartSlice';
import { setFavorites } from '../../reduce/slice/favorites/favoritesSlice';
import { appDispatch } from '../..';
import { authSliceState, UserDto } from '../../reduce/slice/auth/types';

export type LoginParam={
    username:string;
    password:string;
};

export const LoginPage=({...props})=>{
    const history=useNavigate();
    const[values,setValues]=useState<LoginParam>(
          {
            username : '',
            password : ''
          }
        );
    




    const handleSubmit=(e: React.ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault();
        userLogin(values).then(response=>{
            if(response.status===200){
                props.setUser(response.data);
                props.setLoginCart(response.data);
                props.setFavoritesLogin(response.data);
                history('/menu');
            }else{
                props.loginFailure('Something Wrong!Please Try Again'); 
             }

        }).catch((err)=>{
            if(err && err.response){
            
                switch(err.response.status){
                    case 401:
                        console.log("401 status");
                        props.loginFailure("Authentication Failed.Bad Credentials");
                        break;
                    default:
                        props.loginFailure('Something Wrong!Please Try Again'); 
    
                }
    
                }
                else{
                    props.loginFailure('Something Wrong!Please Try Again');
                }
                    
    
                
    
        });
    }
    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        e.persist();
        let name = e.target.name;
        let value = e.target.value;
        setValues({...values,[name] : value})
    }
    
    return(
        <div className="login-page">
            <section>
                <div className="containerLogin">
                                <form onSubmit={handleSubmit}>
                                <span className='title'>Login</span>

                                    <div className='inputfield'>
                                      <input type='text' placeholder='login' name='username' value={values.username} onChange={handleChange}/>
                                      <i className="uil uil-user"></i>
                                    </div>
                                    <div className='inputfield'>
                                      <input type='password' placeholder='password' name='password' value={values.password} onChange={handleChange}/>
                                      <i className="uil uil-lock"></i>
                                    </div>
                                    <button className='button' type='submit'>
                                        Login
                                    </button>
                                </form>
                            </div>
            </section>
        </div>
        

    )
}

function mapStateToProps(auth:authSliceState): {loading : boolean; error : string;}{
    return {
        loading: auth.loading,
        error: auth.err,
    }
}
function mapDispatchToProps(dispatch:appDispatch){
    return {
        setUser:(data:UserDto) => dispatch(setAuthSuc(data)),
        setLoginCart:(data:UserDto) => dispatch(setUpdateCart(data)),
        setFavoritesLogin:(data:UserDto) =>dispatch(setFavorites(data)),
        // loginFailure:(message)=>dispatch(setAuthOut())
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (LoginPage);