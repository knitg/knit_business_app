import axios from 'axios';
import { API_HOST, PRODUCT_PFX, STITCH } from 'react-native-dotenv' 
import { CONST_STITCH } from '../../constants/stitch.constant';

/***
 * DELETE STITCH AND DISPATCH REQUIRED ACTIONS
 */
export const deleteStitchAction = (id) => {
    console.log("INSIDE deleteStitchAction", id);
    return (dispatch, getState) => {
        console.log(`${API_HOST}${PRODUCT_PFX}${STITCH}/${id}`)
        return axios.delete(`${API_HOST}${PRODUCT_PFX}${STITCH}/${id}`)
            .then(response => {
                console.log("SUCCESSFULLY DELETED", response.data);
                dispatch(DELETE_STITCH(response.data))
            })
            .catch(error => {
                dispatch(DELETE_STITCH_ERROR(error))
                console.log(error);
            });
    }
}

export const DELETE_STITCH = (delete_stitch_id) => {
    return {
        type: CONST_STITCH.STITCH_DELETE,
        delete_stitch_id
    };
};

export const DELETE_STITCH_ERROR = error => {
    return {
        type: CONST_STITCH.STITCH_DELETE_ERROR,
        error
    };
};
