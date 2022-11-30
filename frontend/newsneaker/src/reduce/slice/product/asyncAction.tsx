import { createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../../api/authentificateService';
import { ProductParam } from '../../../component/productContainer/CatalogProducts';
import { ProductSliceState } from './types';



export const fetchProduct = createAsyncThunk<ProductSliceState,ProductParam>(
  'product/fetchProductStatus',
   async (params) => {
    const str=params.url.endsWith('?')?'':'&';
    const pasreUrl = `${params.url}${str}page=${params.page}&size=${params.total}`;
    
    const response = await axios({
      method : 'get',
      url : pasreUrl,
      headers : {'Authorization': 'Bearer '+getToken()}
    });


    const totalPage = parseInt(response.headers['x-total-count']+'');



    let data:ProductSliceState= {
      pageNumber: params.page,
      product: response.data,
      totalPages: totalPage,
      isFetching:false,
     }

     

    return  data;
  }
);



