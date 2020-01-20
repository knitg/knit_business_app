import axios from 'axios';
import { API_HOST, PRODUCT_PFX, STITCH_TYPE } from 'react-native-dotenv' 
import { CONST_STITCH } from '../../constants/stitch.constant';


/***
 * GET STITCH LIST AND DISPATCH REQUIRED ACTIONS
 */
export const getStitchTypeListAction = () => {
    return (dispatch, getState) => {
        dispatch(FETCH_STITCH_LOADING(true));
        return axios.get(`${API_HOST}${PRODUCT_PFX}${STITCH_TYPE}`)
            .then(response => {
                console.log("response >>>> ", response.data);
                dispatch(FETCH_STITCH_TYPE_LIST(response.data))
            })
            .catch(error => {
                dispatch(FETCH_STITCH_TYPE_LIST_ERROR(error))
                console.log("STITCH TYPE LIST ERROR >>> ", error);
            }).finally(() => {
                dispatch(FETCH_STITCH_LOADING(false));
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

/***
 * ADD STITCH TYPE AND DISPATCH REQUIRED ACTIONS
 */
export const addStitchTypeAction = (formData) => {
    return (dispatch, getState) => {
        return axios.post(`${API_HOST}${PRODUCT_PFX}${STITCH_TYPE}`, formData, 
            { headers: { 'Content-Type': 'application/json', } })
            .then(response => {
                console.log("RESPONSE STITCH TYPE ", response);
                dispatch(SET_STITCH_TYPE(response.data))
            })
            .catch(error => {
                dispatch(SET_STITCH_TYPE_ERROR(error))
                console.log(error);
            });
    }
}

export const FETCH_STITCH_LOADING = (loading) => {
    return {
        type: CONST_STITCH.STITCH_LOADING,
        loading
    };
};

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
/***
 * UPDATE STITCH AND DISPATCH REQUIRED ACTIONS
 */
export const updateStitchTypeAction = (id, formData) => {
    console.log("INSIDE updateStitchAction", id);
    return (dispatch, getState) => {
        dispatch(FETCH_STITCH_LOADING(true));
        console.log(`${API_HOST}${PRODUCT_PFX}${STITCH_TYPE}/${id}`)
        return axios.put(`${API_HOST}${PRODUCT_PFX}${STITCH_TYPE}/${id}`, formData)
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

export const UPDATE_STITCH = (update_stitch_type_id) => {
    return {
        type: CONST_STITCH.STITCH_TYPE_UPDATE,
        update_stitch_type_id
    };
};

export const UPDATE_STITCH_ERROR = error => {
    return {
        type: CONST_STITCH.STITCH_TYPE_UPDATE_ERR,
        error
    };
};


/***
 * DELETE STITCH AND DISPATCH REQUIRED ACTIONS
 */
export const deleteStitchTypeAction = (id) => {
    console.log("INSIDE deleteStitchTYPEAction", id);
    return (dispatch, getState) => {
        console.log(`${API_HOST}${PRODUCT_PFX}${STITCH_TYPE}/${id}`)
        return axios.delete(`${API_HOST}${PRODUCT_PFX}${STITCH_TYPE}/${id}`)
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

export const DELETE_STITCH = (delete_stitch_type_id) => {
    return {
        type: CONST_STITCH.STITCH_TYPE_DELETE,
        delete_stitch_type_id
    };
};

export const DELETE_STITCH_ERROR = error => {
    return {
        type: CONST_STITCH.STITCH_TYPE_DELETE_ERR,
        error
    };
};

