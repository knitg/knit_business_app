import axios from 'axios';
import { API_HOST, USER_PFX, USER_LIST, PRODUCT_PFX, STITCH } from 'react-native-dotenv' 
import { CONST_STITCH } from '../../constants/stitch.constant';

/***
 * GET STITCH LIST AND DISPATCH REQUIRED ACTIONS
 */
export const getStitchListAction = () => {
    return (dispatch, getState) => {
        return axios.get(`${API_HOST}${PRODUCT_PFX}${STITCH}`)
            .then(response => {
                dispatch(FETCH_STITCH_LIST(response.data))
            })
            .catch(error => {
                dispatch(FETCH_STITCH_LIST_ERROR(error))
                console.log(error);
            });
    }
}

export const FETCH_STITCH_LIST = (stitch) => {
    return {
        type: CONST_STITCH.STITCH_LIST,
        stitch
    };
};

export const FETCH_STITCH_LIST_ERROR = error => {
    return {
        type: CONST_STITCH.STITCH_LIST_ERR,
        error
    };
};
