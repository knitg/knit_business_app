import { CONST_STITCH } from "../../constants/stitch.constant";

const initialState = {};

export default stitchTypeReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {

    case CONST_STITCH.STITCH_LOADING:
      const loading = action.loading
      return { ...state, loading};

    /*** 
     *  >>>>> STITCH TYPE CRUD <<<<<<<
     * */
          
    case CONST_STITCH.STITCH_TYPE_LIST:
      const stitchtypeList = action.data;
      return { ...state, stitchtypeList };

    case CONST_STITCH.STITCH_TYPE_ADD:
      console.log('action >>> ', action);
      const stitch_type_id = action.data;
      return { ...state, stitch_type_id };
    
    case CONST_STITCH.STITCH_TYPE_UPDATE:
      const update_stitch_type_id = action.data;
      return { ...state, update_stitch_type_id };

    case CONST_STITCH.STITCH_TYPE_DELETE:
      const delete_stitch_type_id = action.data;
      return { ...state, delete_stitch_type_id };
    
    default:
      return state;
  }
};
