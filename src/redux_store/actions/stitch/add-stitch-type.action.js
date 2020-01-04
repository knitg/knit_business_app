import axios from 'axios';
import { API_HOST, PRODUCT_PFX, STITCH_TYPE } from 'react-native-dotenv' 
import { CONST_STITCH } from '../../constants/stitch.constant';

/***
 * ADD STITCH TYPE AND DISPATCH REQUIRED ACTIONS
 */
export const addStitchTypeAction = (formData) => {
    return (dispatch, getState) => {
        return axios.post(`${API_HOST}${PRODUCT_PFX}${STITCH_TYPE}`, formData)
            .then(response => {
                dispatch(SET_STITCH_TYPE(response.data))
            })
            .catch(error => {
                dispatch(SET_STITCH_TYPE_ERROR(error))
                console.log(error);
            });
    }
}

export const SET_STITCH_TYPE = (stitch_type_id) => {
    return {
        type: CONST_STITCH.STITCH_TYPE_ADD,
        stitch_type_id
    };
};

export const SET_STITCH_TYPE_ERROR = error => {
    return {
        type: CONST_STITCH.STITCH_TYPE_ADD_ERROR,
        error
    };
};
