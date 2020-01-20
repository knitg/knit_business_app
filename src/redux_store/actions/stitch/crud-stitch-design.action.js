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

/***
 * UPDATE STITCH AND DISPATCH REQUIRED ACTIONS
 */
export const updateStitchTypeDesignAction = (id, formData) => {
    console.log("INSIDE updateStitchAction", id);
    return (dispatch, getState) => {
        dispatch(FETCH_STITCH_LOADING(true));
        console.log(`${API_HOST}${PRODUCT_PFX}${STITCH_TYPE_DESIGN}/${id}`)
        return axios.put(`${API_HOST}${PRODUCT_PFX}${STITCH_TYPE_DESIGN}/${id}`, formData)
            .then(response => {
                console.log("SUCCESSFULLY updated", response.data);
                dispatch(UPDATE_STITCH(response.data))
            }).catch(error => {
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