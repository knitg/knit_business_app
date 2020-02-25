import axios from 'axios';
import { API_HOST, PRODUCT_PFX, PRODUCT } from 'react-native-dotenv' 
import { alert } from '../../../core/utils/alert';

/**DISPATCH CALLBACKS */
import { 
    LOADING, SUCCESS_RESPONSE, ERROR_RESPONSE 
} from './product-dispatch.callback';
import { CONST_PRODUCT } from '../../constants/product.constant';

/***
 * GET PRODUCT  LIST AND DISPATCH REQUIRED ACTIONS
 */
export const getProductListAction = () => {
    return (dispatch, getState) => {
        dispatch(LOADING(true));
        console.log(`${API_HOST}${PRODUCT_PFX}${PRODUCT}`)
        return axios.get(`${API_HOST}${PRODUCT_PFX}${PRODUCT}`)
            .then(response => {
                console.log(response)
                dispatch(SUCCESS_RESPONSE(CONST_PRODUCT.PRODUCT_LIST, response.data))
            })
            .catch(error => {
                dispatch(ERROR_RESPONSE(CONST_PRODUCT.PRODUCT_LIST_ERR, error))
                console.log(error);
            }).finally(() => {
                dispatch(LOADING(false));
            });
    }
}

/***
 * ADD PRODUCT  AND DISPATCH REQUIRED ACTIONS
 */
export const addProductAction = (formData) => {
    return (dispatch, getState) => {
        return axios.post(`${API_HOST}${PRODUCT_PFX}${PRODUCT}`, formData, 
                { headers: { 'Content-Type': 'application/json', } }
            ).then(response => {
                console.log("SUCCESS USER ", response);
                dispatch(SUCCESS_RESPONSE(CONST_PRODUCT.PRODUCT_ADD, response.data))
            }).catch(error => {
                console.log("ERROR USER ", error[0]);
                alert("PRODUCT ", "Something went wrong")
                dispatch(ERROR_RESPONSE(CONST_PRODUCT.PRODUCT_ADD_ERROR, error))
                console.log(error);
            });
    }
} 

/***
 * UPDATE PRODUCT AND DISPATCH REQUIRED ACTIONS
 */
export const updateProductAction = (id, formData) => {
    console.log("INSIDE updateUSERAction", id);
    return (dispatch, getState) => {
        dispatch(LOADING(true));
        console.log(`${API_HOST}${PRODUCT_PFX}${PRODUCT}/${id}`)
        return axios.put(`${API_HOST}${PRODUCT_PFX}${PRODUCT}/${id}`, formData)
            .then(response => {
                console.log("SUCCESSFULLY updated", response.data);
                dispatch(SUCCESS_RESPONSE(CONST_PRODUCT.PRODUCT_UPDATE, response.data))
            })
            .catch(error => {
                dispatch(ERROR_RESPONSE(CONST_PRODUCT.PRODUCT_UPDATE_ERR, error))
                console.log(error);
            }).finally(() => {
                dispatch(LOADING(false));
            });;
    }
}

/***
 * DELETE PRODUCT AND DISPATCH REQUIRED ACTIONS
 */
export const deleteProductAction = (id) => {
    console.log("INSIDE deleteUSERAction", id);
    return (dispatch, getState) => {
        dispatch(LOADING(true));
        console.log(`${API_HOST}${PRODUCT_PFX}${PRODUCT}/${id}`)
        return axios.delete(`${API_HOST}${PRODUCT_PFX}${PRODUCT}/${id}`)
            .then(response => {
                console.log("SUCCESSFULLY DELETED", response.data);
                dispatch(SUCCESS_RESPONSE(CONST_PRODUCT.PRODUCT_DELETE, response.data))
            })
            .catch(error => {
                dispatch(ERROR_RESPONSE(CONST_PRODUCT.PRODUCT_DELETE_ERR, error))
                console.log(error);
            }).finally(() => {
                dispatch(LOADING(false));
            });
    }
}