import axios from 'axios';
import { API_HOST, USER_PFX, USER_TYPE } from 'react-native-dotenv' 
import { alert } from '../../../core/utils/alert';

/**DISPATCH CALLBACKS */
import { 
    LOADING, SUCCESS_RESPONSE, ERROR_RESPONSE 
} from './user-dispatch.callback';
import { CONST_USER } from '../../constants/user.constant';

/***
 * GET USER TYPE LIST AND DISPATCH REQUIRED ACTIONS
 */
export const getUserTypeListAction = () => {
    return (dispatch, getState) => {
        dispatch(LOADING(true));
        console.log(`${API_HOST}${USER_PFX}${USER_TYPE}`)
        return axios.get(`${API_HOST}${USER_PFX}${USER_TYPE}`)
            .then(response => {
                console.log("USER TYPE >>> ", response)
                dispatch(SUCCESS_RESPONSE(CONST_USER.USER_TYPE_LIST, response.data))
            })
            .catch(error => {
                dispatch(ERROR_RESPONSE(CONST_USER.USER_TYPE_LIST_ERR, error))
                console.log(error);
            }).finally(() => {
                dispatch(LOADING(false));
            });
    }
}

/***
 * ADD USER TYPE AND DISPATCH REQUIRED ACTIONS
 */
export const addUserTypeAction = (formData) => {
    return (dispatch, getState) => {
        return axios.post(`${API_HOST}${USER_PFX}${USER_TYPE}`, formData, 
                { headers: { 'Content-Type': 'application/json', } }
            ).then(response => {
                console.log("SUCCESS USER ", response);
                dispatch(SUCCESS_RESPONSE(CONST_USER.USER_TYPE_ADD, response.data))
            }).catch(error => {
                console.log("ERROR USER ", error[0]);
                alert("USER TYPE", "Something went wrong")
                dispatch(ERROR_RESPONSE(CONST_USER.USER_TYPE_ADD_ERROR, error))
                console.log(error);
            });
    }
} 

/***
 * UPDATE USER AND DISPATCH REQUIRED ACTIONS
 */
export const updateUserTypeAction = (id, formData) => {
    console.log("INSIDE updateUSERAction", id);
    return (dispatch, getState) => {
        dispatch(LOADING(true));
        console.log(`${API_HOST}${USER_PFX}${USER_TYPE}/${id}`)
        return axios.put(`${API_HOST}${USER_PFX}${USER_TYPE}/${id}`, formData)
            .then(response => {
                console.log("SUCCESSFULLY updated", response.data);
                dispatch(SUCCESS_RESPONSE(CONST_USER.USER_TYPE_UPDATE, response.data))
            })
            .catch(error => {
                dispatch(ERROR_RESPONSE(CONST_USER.USER_TYPE_UPDATE_ERR, error))
                console.log(error);
            }).finally(() => {
                dispatch(LOADING(false));
            });;
    }
}

/***
 * DELETE USER AND DISPATCH REQUIRED ACTIONS
 */
export const deleteUserTypeAction = (id) => {
    console.log("INSIDE deleteUSERAction", id);
    return (dispatch, getState) => {
        dispatch(LOADING(true));
        console.log(`${API_HOST}${USER_PFX}${USER_TYPE}/${id}`)
        return axios.delete(`${API_HOST}${USER_PFX}${USER_TYPE}/${id}`)
            .then(response => {
                console.log("SUCCESSFULLY DELETED", response.data);
                dispatch(SUCCESS_RESPONSE(CONST_USER.USER_TYPE_DELETE, response.data))
            })
            .catch(error => {
                dispatch(ERROR_RESPONSE(CONST_USER.USER_TYPE_DELETE_ERR, error))
                console.log(error);
            }).finally(() => {
                dispatch(LOADING(false));
            });
    }
}