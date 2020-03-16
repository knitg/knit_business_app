import axios from 'axios';
import { API_HOST, USER_PFX, LOGIN } from 'react-native-dotenv' 
import { alert } from '../../../core/utils/alert';

/**DISPATCH CALLBACKS */
import { 
    LOADING, SUCCESS_RESPONSE, ERROR_RESPONSE, USER_STATUS
} from './user-dispatch.callback';
import { CONST_USER } from '../../constants/user.constant';

/***
 * GET USER LIST AND DISPATCH REQUIRED ACTIONS
 */
export const getUserListAction = () => {
    return (dispatch, getState) => {
        
        dispatch(LOADING(true));
        dispatch(USER_STATUS(CONST_USER.USER_UPDATE, null))
        dispatch(USER_STATUS(CONST_USER.USER_ADD, null))
        dispatch(USER_STATUS(CONST_USER.USER_DELETE, null))

        console.log(`${API_HOST}${USER_PFX}${LOGIN}`)
        return axios.get(`${API_HOST}${USER_PFX}${LOGIN}`)
            .then(response => {
                console.log("SUCCESS ", response);
                dispatch(SUCCESS_RESPONSE(CONST_USER.USER_LIST, response.data))
                return response.data;
            })
            .catch(error => {
                alert("USER LIST ERROR", "Something went wrong");
                dispatch(ERROR_RESPONSE(CONST_USER.USER_LIST_ERR, error))
                console.log(error);
                return error;
            }).finally(() => {
                dispatch(LOADING(false));
            });
    }
}

/***
 * GET USER DETAIL AND DISPATCH REQUIRED ACTIONS
 */
export const getUserDetailAction = (id) => {
    return (dispatch, getState) => {
        dispatch(LOADING(true)); 
        console.log(`${API_HOST}${USER_PFX}${LOGIN}/${id}`)
        return axios.get(`${API_HOST}${USER_PFX}${LOGIN}/${id}`)
            .then(response => {
                console.log("SUCCESS ", response);
                dispatch(SUCCESS_RESPONSE(CONST_USER.USER_DETAIL, response.data))
                return response.data;
            })
            .catch(error => {
                console.log(error);
                alert("USER DETAIL ERROR", "Something went wrong");
                dispatch(ERROR_RESPONSE(CONST_USER.USER_DETAIL_ERR, error))
                return error;
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
        dispatch(LOADING(true)); 
        console.log(`${API_HOST}${USER_PFX}${LOGIN}`, formData)
        return axios.post(`${API_HOST}${USER_PFX}${LOGIN}`, formData, 
                { headers: { 'Content-Type': 'application/json'} }
            ).then(response => {
                console.log("SUCCESS USER ", response);
                dispatch(SUCCESS_RESPONSE(CONST_USER.USER_ADD, response.data))
                return response.data;
            }).catch(error => {
                console.log("ERROR USER ", error);
                alert("USER ADD ERROR", "Something went wrong");
                dispatch(SUCCESS_RESPONSE(CONST_USER.USER_ADD, null))
                return error;
            }).finally(() => {
                dispatch(LOADING(false));
            });;
    }
} 

/***
 * UPDATE USER AND DISPATCH REQUIRED ACTIONS
 */
export const updateUserAction = (id, formData) => {
    console.log("\n\n\n\n\n\nINSIDE updateUSERAction", id);
    return (dispatch, getState) => {
        dispatch(LOADING(true));
        console.log(`${API_HOST}${USER_PFX}${LOGIN}/${id}`)
        return axios.put(`${API_HOST}${USER_PFX}${LOGIN}/${id}`, formData)
            .then(response => {
                console.log("SUCCESSFULLY updated", response.data);
                dispatch(SUCCESS_RESPONSE(CONST_USER.USER_UPDATE, response.data))
                return response.data;
            })
            .catch(error => {
                dispatch(ERROR_RESPONSE(CONST_USER.USER_UPDATE_ERR, error));
                alert("USER UPDATE ERROR", "Something went wrong");
                console.log(error);
                return error;
            }).finally(() => {
                dispatch(LOADING(false));
            });;
    }
}

/***
 * DELETE USER AND DISPATCH REQUIRED ACTIONS
 */
export const deleteUserAction = (id) => {
    console.log("INSIDE deleteUSERAction", id, `${API_HOST}${USER_PFX}${LOGIN}/${id}`);
    return (dispatch, getState) => {        
        dispatch(LOADING(true));
        return axios.delete(`${API_HOST}${USER_PFX}${LOGIN}/${id}`)
            .then(response => {
                console.log("SUCCESSFULLY DELETED", response.data);
                dispatch(SUCCESS_RESPONSE(CONST_USER.USER_DELETE, response.data))
                return response.data;
            })
            .catch(error => {
                dispatch(SUCCESS_RESPONSE(CONST_USER.USER_DELETE, null))
                alert("USER DELETE ERROR", "Something went wrong");
                return error;
            }).finally(() => {
                dispatch(LOADING(false));
            });
    }
}