import { CONST_VENDOR } from '../../constants/vendor.constant';

export const LOADING = (loading) => {
    return {
        type: CONST_VENDOR.VENDOR_LOADING,
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
 
export const VENDOR_STATUS = (actionType, data) => {
    return {
        type: actionType,
        data
    };
};
 