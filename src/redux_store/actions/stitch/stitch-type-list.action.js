import axios from 'axios';
import { API_HOST, USER_PFX, USER_LIST, PRODUCT_PFX, STITCH_TYPE } from 'react-native-dotenv' 
import { CONST_STITCH } from '../../constants/stitch.constant';

/***
 * GET STITCH LIST AND DISPATCH REQUIRED ACTIONS
 */
export const getStitchTypeListAction = () => {
    return (dispatch, getState) => {
        return axios.get(`${API_HOST}${PRODUCT_PFX}${STITCH_TYPE}`)
            .then(response => {
                console.log("response >>>> ", response.data);
                dispatch(FETCH_STITCH_TYPE_LIST(response.data))
            })
            .catch(error => {
                dispatch(FETCH_STITCH_TYPE_LIST_ERROR(error))
                console.log(error);
            });
    }
}

export const FETCH_STITCH_TYPE_LIST = (stitchtypeList) => {
    return {
        type: CONST_STITCH.STITCH_TYPE_LIST,
        stitchtypeList
    };
};

export const FETCH_STITCH_TYPE_LIST_ERROR = error => {
    return {
        type: CONST_STITCH.STITCH_TYPE_LIST_ERR,
        error
    };
};
