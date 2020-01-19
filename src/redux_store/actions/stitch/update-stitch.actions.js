import axios from 'axios';
import { API_HOST, PRODUCT_PFX, STITCH } from 'react-native-dotenv' 
import { CONST_STITCH } from '../../constants/stitch.constant';

/***
 * UPDATE STITCH AND DISPATCH REQUIRED ACTIONS
 */
export const updateStitchAction = (id, formData) => {
    console.log("INSIDE updateStitchAction", id);
    return (dispatch, getState) => {
        dispatch(FETCH_STITCH_LOADING(true));
        console.log(`${API_HOST}${PRODUCT_PFX}${STITCH}/${id}`)
        return axios.put(`${API_HOST}${PRODUCT_PFX}${STITCH}/${id}`, formData)
            .then(response => {
                console.log("SUCCESSFULLY updated", response.data);
                dispatch(UPDATE_STITCH(response.data))
            })
            .catch(error => {
                dispatch(UPDATE_STITCH_ERROR(error))
                console.log(error);
            }).finally(() => {
                dispatch(FETCH_STITCH_LOADING(false));
            });;
    }
}
export const FETCH_STITCH_LOADING = (loading) => {
    return {
        type: CONST_STITCH.STITCH_LOADING,
        loading
    };
};

export const UPDATE_STITCH = (update_stitch_id) => {
    return {
        type: CONST_STITCH.STITCH_UPDATE,
        update_stitch_id
    };
};

export const UPDATE_STITCH_ERROR = error => {
    return {
        type: CONST_STITCH.STITCH_UPDATE_ERROR,
        error
    };
};
