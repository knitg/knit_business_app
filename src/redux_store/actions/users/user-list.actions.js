import axios from 'axios';
import { API_HOST, USER_PFX, USER_LIST } from 'react-native-dotenv'
import { CONST_USER } from '../../constants/user.constant';

/***
 * GET USER LIST AND DISPATCH REQUIRED ACTIONS
 */
export const getUserListAction = () => {
    return (dispatch, getState) => {
        return axios.get(`${API_HOST}${USER_PFX}${USER_LIST}`)
            .then(response => {
                dispatch(FETCH_USER_LIST(response.data))
            })
            .catch(error => {
                dispatch(FETCH_USER_LIST_ERROR(error))
                console.log(error);
            });
    }
}

export const FETCH_USER_LIST = (users) => {
    return {
        type: CONST_USER.USER_LIST,
        users
    };
};

export const FETCH_USER_LIST_ERROR = error => {
    return {
        type: CONST_USER.USER_LIST_ERROR,
        error
    };
};
