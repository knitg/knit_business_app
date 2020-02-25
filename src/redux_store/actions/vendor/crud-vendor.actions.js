import axios from 'axios';
import { API_HOST, USER_PFX, VENDOR } from 'react-native-dotenv' 
import { alert } from '../../../core/utils/alert';

/**DISPATCH CALLBACKS */
import { 
    LOADING, SUCCESS_RESPONSE, ERROR_RESPONSE 
} from '../users/user-dispatch.callback';
import { CONST_VENDOR } from '../../constants/vendor.constant';

/***
 * GET USER TYPE LIST AND DISPATCH REQUIRED ACTIONS
 */
export const getVendorListAction = () => {
    return (dispatch, getState) => {
        dispatch(LOADING(true));
        console.log(`${API_HOST}${USER_PFX}${VENDOR}`)
        return axios.get(`${API_HOST}${USER_PFX}${VENDOR}`)
            .then(response => {
                console.log(response)
                dispatch(SUCCESS_RESPONSE(CONST_VENDOR.VENDOR_LIST, response.data))
            })
            .catch(error => {
                dispatch(ERROR_RESPONSE(CONST_VENDOR.VENDOR_LIST_ERR, error))
                console.log(error);
            }).finally(() => {
                dispatch(LOADING(false));
            });
    }
}

/***
 * ADD USER TYPE AND DISPATCH REQUIRED ACTIONS
 */
export const addVendorAction = (formData) => {
    return (dispatch, getState) => {
        return axios.post(`${API_HOST}${USER_PFX}${VENDOR}`, formData, 
                { headers: { 'Content-Type': 'application/json', } }
            ).then(response => {
                console.log("SUCCESS USER ", response);
                dispatch(SUCCESS_RESPONSE(CONST_VENDOR.VENDOR_ADD, response.data))
            }).catch(error => {
                console.log("ERROR USER ", error[0]);
                alert("USER TYPE", "Something went wrong")
                dispatch(ERROR_RESPONSE(CONST_VENDOR.VENDOR_ADD_ERROR, error))
                console.log(error);
            });
    }
} 

/***
 * UPDATE USER AND DISPATCH REQUIRED ACTIONS
 */
export const updateVendorAction = (id, formData) => {
    console.log("INSIDE updateUSERAction", id);
    return (dispatch, getState) => {
        dispatch(LOADING(true));
        console.log(`${API_HOST}${USER_PFX}${VENDOR}/${id}`)
        return axios.put(`${API_HOST}${USER_PFX}${VENDOR}/${id}`, formData)
            .then(response => {
                console.log("SUCCESSFULLY updated", response.data);
                dispatch(SUCCESS_RESPONSE(CONST_VENDOR.VENDOR_UPDATE, response.data))
            })
            .catch(error => {
                dispatch(ERROR_RESPONSE(CONST_VENDOR.VENDOR_UPDATE_ERR, error))
                console.log(error);
            }).finally(() => {
                dispatch(LOADING(false));
            });;
    }
}

/***
 * DELETE USER AND DISPATCH REQUIRED ACTIONS
 */
export const deleteVendorAction = (id) => {
    console.log("INSIDE deleteUSERAction", id);
    return (dispatch, getState) => {
        dispatch(LOADING(true));
        console.log(`${API_HOST}${USER_PFX}${VENDOR}/${id}`)
        return axios.delete(`${API_HOST}${USER_PFX}${VENDOR}/${id}`)
            .then(response => {
                console.log("SUCCESSFULLY DELETED", response.data);
                dispatch(SUCCESS_RESPONSE(CONST_VENDOR.VENDOR_DELETE, response.data))
            })
            .catch(error => {
                dispatch(ERROR_RESPONSE(CONST_VENDOR.VENDOR_DELETE_ERR, error))
                console.log(error);
            }).finally(() => {
                dispatch(LOADING(false));
            });
    }
}