import { CONST_USER } from '../../constants/user.constant';

export const LOADING = (loading) => {
    return {
        type: CONST_USER.USER_LOADING,
        loading
    };
};

export const SUCCESS_RESPONSE = (actionType, data) => {
    return {
        type: actionType,
        data
    };
};

export const ERROR_RESPONSE = (actionType, error) => {
    return {
        type: actionType,
        error
    };
};
 
export const USER_STATUS = (actionType, data) => {
    return {
        type: actionType,
        data
    };
};
 