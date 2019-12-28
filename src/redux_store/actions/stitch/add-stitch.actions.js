import axios from 'axios';
import { API_HOST, PRODUCT_PFX, STITCH } from 'react-native-dotenv' 
import { CONST_STITCH } from '../../constants/stitch.constant';

/***
 * ADD STITCH AND DISPATCH REQUIRED ACTIONS
 */
export const addStitchAction = (formData) => {
    return (dispatch, getState) => {
        return axios.post(`${API_HOST}${PRODUCT_PFX}${STITCH}`, formData)
            .then(response => {
                dispatch(SET_ADD_STITCH(response.data))
            })
            .catch(error => {
                dispatch(SET_ADD_STITCH_ERROR(error))
                console.log(error);
            });
    }
}

export const SET_ADD_STITCH = (stitch_id) => {
    return {
        type: CONST_STITCH.STITCH_ADD,
        stitch_id
    };
};

export const SET_ADD_STITCH_ERROR = error => {
    return {
        type: CONST_STITCH.STITCH_ADD_ERROR,
        error
    };
};
