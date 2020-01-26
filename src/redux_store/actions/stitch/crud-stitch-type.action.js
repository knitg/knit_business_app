import axios from 'axios';
import { API_HOST, PRODUCT_PFX, STITCH_TYPE } from 'react-native-dotenv' 
import { alert } from '../../../core/utils/alert';

/**DISPATCH CALLBACKS */
import { 
    LOADING, SUCCESS_RESPONSE, ERROR_RESPONSE 
} from './stitch-dispatch.callback';
import { CONST_STITCH } from '../../constants/stitch.constant';

/***
 * GET STITCH LIST AND DISPATCH REQUIRED ACTIONS
 */
export const getStitchTypeListAction = () => {
    return (dispatch, getState) => {
        dispatch(LOADING(true));
        console.log(`${API_HOST}${PRODUCT_PFX}${STITCH_TYPE}`)
        return axios.get(`${API_HOST}${PRODUCT_PFX}${STITCH_TYPE}`)
            .then(response => {
                console.log("SUCCCESSS ", response)
                dispatch(SUCCESS_RESPONSE(CONST_STITCH.STITCH_TYPE_LIST, response.data))
            })
            .catch(error => {
                dispatch(ERROR_RESPONSE(CONST_STITCH.STITCH_TYPE_LIST_ERR, error))
                console.log(error);
            }).finally(() => {
                dispatch(LOADING(false));
            });
    }
}

/***
 * ADD STITCH AND DISPATCH REQUIRED ACTIONS
 */
export const addStitchTypeAction = (formData) => {
    return (dispatch, getState) => {
        console.log(`${API_HOST}${PRODUCT_PFX}${STITCH_TYPE}`);
        return axios.post(`${API_HOST}${PRODUCT_PFX}${STITCH_TYPE}`, formData, 
                            { headers: { 'Content-Type': 'application/json', } }
                          )
            .then(response => {
                console.log("SUCCESS STITCH ", response);
                dispatch(SUCCESS_RESPONSE(CONST_STITCH.STITCH_TYPE_ADD, response.data))
            })
            .catch(error => {
                console.log("ERROR STITCH ", error[0]);
                alert("STITCH ", "Something went wrong")
                dispatch(ERROR_RESPONSE(CONST_STITCH.STITCH_TYPE_ADD_ERROR, error))
                console.log(error);
            });
    }
} 

/***
 * UPDATE STITCH AND DISPATCH REQUIRED ACTIONS
 */
export const updateStitchTypeAction = (id, formData) => {
    console.log("INSIDE updateStitchAction", id);
    return (dispatch, getState) => {
        dispatch(LOADING(true));
        console.log(`${API_HOST}${PRODUCT_PFX}${STITCH_TYPE}/${id}`)
        return axios.put(`${API_HOST}${PRODUCT_PFX}${STITCH_TYPE}/${id}`, formData)
            .then(response => {
                console.log("SUCCESSFULLY updated", response.data);
                dispatch(SUCCESS_RESPONSE(CONST_STITCH.UPDATE_STITCH, response.data))
            })
            .catch(error => {
                dispatch(ERROR_RESPONSE(CONST_STITCH.STITCH_UPDATE_ERR, error))
                console.log(error);
            }).finally(() => {
                dispatch(LOADING(false));
            });;
    }
}

/***
 * DELETE STITCH AND DISPATCH REQUIRED ACTIONS
 */
export const deleteStitchTypeAction = (id) => {
    console.log("INSIDE deleteStitchAction", id);
    return (dispatch, getState) => {
        dispatch(LOADING(true));
        console.log(`${API_HOST}${PRODUCT_PFX}${STITCH_TYPE}/${id}`)
        return axios.delete(`${API_HOST}${PRODUCT_PFX}${STITCH_TYPE}/${id}`)
            .then(response => {
                console.log("SUCCESSFULLY DELETED", response.data);
                dispatch(SUCCESS_RESPONSE(CONST_STITCH.DELETE_STITCH, response.data))
            })
            .catch(error => {
                dispatch(ERROR_RESPONSE(CONST_STITCH.STITCH_DELETE_ERR, error))
                console.log(error);
            }).finally(() => {
                dispatch(LOADING(false));
            });
    }
}