import { CONST_STITCH } from '../../constants/stitch.constant';

export const FETCH_STITCH_LOADING = (loading) => {
    return {
        type: CONST_STITCH.STITCH_LOADING,
        loading
    };
};

/**
 * STITCH LIST
 */
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

/**
 * STITCH ADD 
 */

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

/**
 * STITCH UPDATE 
 */
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

/**
 * STITCH DELETE 
 */
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