import axios from 'axios';
import { API_HOST, PRODUCT_PFX, STITCH_TYPE_DESIGN } from 'react-native-dotenv' 
import { CONST_STITCH } from '../../constants/stitch.constant';

/***
 * ADD STITCH TYPE DESIGN AND DISPATCH REQUIRED ACTIONS
 */
export const addStitchTypeDesignAction = (formData) => {
    return (dispatch, getState) => {
        return axios.post(`${API_HOST}${PRODUCT_PFX}${STITCH_TYPE_DESIGN}`, formData)
            .then(response => {
                dispatch(SET_STITCH_TYPE_DESIGN(response.data))
            })
            .catch(error => {
                dispatch(SET_STITCH_TYPE_DESIGN_ERROR(error))
                console.log(error);
            });
    }
}

export const SET_STITCH_TYPE_DESIGN = (stitch_type_design_id) => {
    return {
        type: CONST_STITCH.STITCH_TYPE_DESIGN_ADD,
        stitch_type_design_id
    };
};

export const SET_STITCH_TYPE_DESIGN_ERROR = error => {
    return {
        type: CONST_STITCH.STITCH_TYPE_DESIGN_ADD_ERROR,
        error
    };
};
