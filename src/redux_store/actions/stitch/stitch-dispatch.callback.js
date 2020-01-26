import { CONST_STITCH } from '../../constants/stitch.constant';

export const LOADING = (loading) => {
    return {
        type: CONST_STITCH.STITCH_LOADING,
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
 