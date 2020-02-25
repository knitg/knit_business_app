import axios from 'axios';
import { API_HOST, USER_PFX, USER } from 'react-native-dotenv' 
import { alert } from '../../../core/utils/alert';

/**DISPATCH CALLBACKS */
import { 
    LOADING, SUCCESS_RESPONSE, ERROR_RESPONSE 
} from './user-dispatch.callback';
import { CONST_USER } from '../../constants/user.constant';

/***
 * GET USER LIST AND DISPATCH REQUIRED ACTIONS
 */
export const getUserListAction = () => {
    return (dispatch, getState) => {
        dispatch(LOADING(true));
        console.log(`${API_HOST}${USER_PFX}${USER}`)
        return axios.get(`${API_HOST}${USER_PFX}${USER}`)
            .then(response => {
                console.log(response)
                dispatch(SUCCESS_RESPONSE(CONST_USER.USER_LIST, response.data))
            })
            .catch(error => {
                dispatch(ERROR_RESPONSE(CONST_USER.USER_LIST_ERR, error))
                console.log(error);
            }).finally(() => {
                dispatch(LOADING(false));
            });
    }
}

/***
 * ADD USER AND DISPATCH REQUIRED ACTIONS
 */
export const addUserAction = (formData) => {
    return (dispatch, getState) => {
        return axios.post(`${API_HOST}${USER_PFX}${USER}`, formData, 
                { headers: { 'Content-Type': 'application/json', } }
            ).then(response => {
                console.log("SUCCESS USER ", response);
                dispatch(SUCCESS_RESPONSE(CONST_USER.USER_ADD, response.data))
            }).catch(error => {
                console.log("ERROR USER ", error[0]);
                alert("USER ", "Something went wrong")
                dispatch(ERROR_RESPONSE(CONST_USER.USER_ADD_ERROR, error))
                console.log(error);
            });
    }
} 

/***
 * UPDATE USER AND DISPATCH REQUIRED ACTIONS
 */
export const updateUserAction = (id, formData) => {
    console.log("INSIDE updateUSERAction", id);
    return (dispatch, getState) => {
        dispatch(LOADING(true));
        console.log(`${API_HOST}${USER_PFX}${USER}/${id}`)
        return axios.put(`${API_HOST}${USER_PFX}${USER}/${id}`, formData)
            .then(response => {
                console.log("SUCCESSFULLY updated", response.data);
                dispatch(SUCCESS_RESPONSE(CONST_USER.USER_UPDATE, response.data))
            })
            .catch(error => {
                dispatch(ERROR_RESPONSE(CONST_USER.USER_UPDATE_ERR, error))
                console.log(error);
            }).finally(() => {
                dispatch(LOADING(false));
            });;
    }
}

/***
 * DELETE USER AND DISPATCH REQUIRED ACTIONS
 */
export const deleteUserAction = (id) => {
    console.log("INSIDE deleteUSERAction", id);
    return (dispatch, getState) => {
        dispatch(LOADING(true));
        console.log(`${API_HOST}${USER_PFX}${USER}/${id}`)
        return axios.delete(`${API_HOST}${USER_PFX}${USER}/${id}`)
            .then(response => {
                console.log("SUCCESSFULLY DELETED", response.data);
                dispatch(SUCCESS_RESPONSE(CONST_USER.USER_DELETE, response.data))
            })
            .catch(error => {
                dispatch(ERROR_RESPONSE(CONST_USER.USER_DELETE_ERR, error))
                console.log(error);
            }).finally(() => {
                dispatch(LOADING(false));
            });
    }
}