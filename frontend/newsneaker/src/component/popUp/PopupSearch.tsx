import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchValue } from '../../reduce/slice/filters/filterSlice';
import './popup-search.scss';

export const PopupSearch:React.FC= React.memo(()=>{

    const[search,setSearch]=React.useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


function handleSubmit(e:React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setSearchValue(search));
    navigate('/dashboard/search');
}



const handleChange=React.useCallback((select:React.ChangeEvent<HTMLInputElement>)=>{
    select.persist();
    setSearch(select.target.value);
    // dispatch(setSearchValue(select.target.value));
  },[]);


    return(
        <div className="popup-search">
            <form className="popup-search__form" onSubmit={handleSubmit}>
                <div className='serch-field'>
                    <input
                     onChange={handleChange}
                    type='text' 
                    placeholder='Поиск' 
                    name='search'
                    autoComplete="off"/>
                </div>
                <input className='btn-header' type='submit' value='Искать'/>
            </form>
        </div>
    );
});