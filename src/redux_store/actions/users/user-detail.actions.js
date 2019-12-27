import axios from 'axios';
import { API_HOST, USER_PFX, USER_LIST } from 'react-native-dotenv'
import { CONST_USER } from '../../constants/user.constant';
/***
 * GET USER DETAILS AND DISPATCH REQUIRED ACTIONS
 */
export const getUserDetailAction = (userId) => {
    return (dispatch, getState) => {
        return axios.get(`${API_HOST}${USER_PFX}${USER_LIST}/${userId}`)
            .then(response => {
                dispatch(FETCH_USER_DETAILS(response.data))
            })
            .catch(error => {
                dispatch(FETCH_USER_DETAILS_ERROR(error))
                console.log(error);
            });
    }
}


export const FETCH_USER_DETAILS = (userdetail) => {
    return {
        type: CONST_USER.USER_DETAIL,
        userdetail
    };
};

export const FETCH_USER_DETAILS_ERROR = error => {
    return {
        type: CONST_USER.USER_DETAIL_ERROR,
        error
    };
};