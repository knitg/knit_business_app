import { CONST_PRODUCT } from '../../constants/product.constant';

export const LOADING = (loading) => {
    return {
        type: CONST_PRODUCT.PRODUCT_LOADED,
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
 