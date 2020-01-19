import axios from 'axios';
import { API_HOST, PRODUCT_PFX, STITCH } from 'react-native-dotenv' 
import { CONST_STITCH } from '../../constants/stitch.constant';
import KAlert, { alert } from '../../../core/utils/alert';

/***
 * ADD STITCH AND DISPATCH REQUIRED ACTIONS
 */
export const addStitchAction = (formData) => {
    return (dispatch, getState) => {
        return axios.post(`${API_HOST}${PRODUCT_PFX}${STITCH}`, formData, 
                            { headers: { 'Content-Type': 'application/json', } }
                          )
            .then(response => {
                console.log("SUCCESS STITCH ", response);
                dispatch(SET_ADD_STITCH(response.data))
            })
            .catch(error => {
                console.log("ERROR STITCH ", error[0]);
                alert("STITCH", "Something went wrong")
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
