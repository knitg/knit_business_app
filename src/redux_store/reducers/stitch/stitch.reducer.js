import { CONST_STITCH } from "../../constants/stitch.constant";

const initialState = {};

export default stitchReducer = (state = initialState, action) => {
  switch (action.type) {

    case CONST_STITCH.STITCH_LOADING:
      const loading = action.loading
      return { ...state, loading};

    /*** 
     *  >>>>> STITCH CRUD <<<<<<<
     * */
    
    case CONST_STITCH.STITCH_LIST:
      const stitchlist = action.data;
      return { ...state, stitchlist };

    case CONST_STITCH.STITCH_ADD:
      const stitch_id = action.data;
      return { ...state, stitch_id };

    case CONST_STITCH.STITCH_DETAIL:
      const stitchdetails = action.data;
      return { ...state, stitchdetails };

    case CONST_STITCH.STITCH_UPDATE:
      const update_stitch_id = action.data;
      return { ...state, update_stitch_id };

    case CONST_STITCH.STITCH_DELETE:
      const delete_stitch_id = action.data;
      return { ...state, delete_stitch_id }; 
    
    default:
      return state;
  }
};
