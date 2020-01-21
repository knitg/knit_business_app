import axios from 'axios';
import { API_HOST, PRODUCT_PFX, STITCH } from 'react-native-dotenv' 
import { alert } from '../../../core/utils/alert';

/**DISPATCH CALLBACKS */
import { 
    FETCH_STITCH_LOADING,
    FETCH_STITCH_LIST, FETCH_STITCH_LIST_ERROR,  
    SET_ADD_STITCH, SET_ADD_STITCH_ERROR, 
    UPDATE_STITCH, UPDATE_STITCH_ERROR, 
    DELETE_STITCH, DELETE_STITCH_ERROR 
} from './stitch-dispatch.callback';

/***
 * GET STITCH LIST AND DISPATCH REQUIRED ACTIONS
 */
export const getStitchListAction = () => {
    return (dispatch, getState) => {
        dispatch(FETCH_STITCH_LOADING(true));
        console.log(`${API_HOST}${PRODUCT_PFX}${STITCH}`)
        return axios.get(`${API_HOST}${PRODUCT_PFX}${STITCH}`)
            .then(response => {
                console.log(response)
                dispatch(FETCH_STITCH_LIST(response.data))
            })
            .catch(error => {
                dispatch(FETCH_STITCH_LIST_ERROR(error))
                console.log(error);
            }).finally(() => {
                dispatch(FETCH_STITCH_LOADING(false));
            });
    }
}

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
                alert("STITCH ", "Something went wrong")
                dispatch(SET_ADD_STITCH_ERROR(error))
                console.log(error);
            });
    }
} 

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