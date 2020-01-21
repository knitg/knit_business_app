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
      const stitchtypeList = action.stitchtypeList;
      return { ...state, stitchtypeList };

    case CONST_STITCH.STITCH_TYPE_ADD:
      const stitch_type_id = action.stitch_type_id;
      return { ...state, stitch_type_id };
    
    case CONST_STITCH.STITCH_TYPE_UPDATE:
      const update_stitch_type_id = action.update_stitch_type_id;
      return { ...state, update_stitch_type_id };

    case CONST_STITCH.STITCH_TYPE_DELETE:
      const delete_stitch_type_id = action.delete_stitch_type_id;
      return { ...state, delete_stitch_type_id };

    /*** 
     *  >>>>> "STITCH TYPE DESIGN" CRUD <<<<<<<
     * */
    
    case CONST_STITCH.STITCH_TYPE_DESIGN_LIST:
      const stitchtypeDesignsList = action.stitchtypeDesignsList;
      return { ...state, stitchtypeDesignsList };

    case CONST_STITCH.STITCH_TYPE_DESIGN_ADD:
      const stitch_type_design_id = action.stitch_type_design_id;
      return { ...state, stitch_type_design_id };
    
    case CONST_STITCH.STITCH_TYPE_DESIGN_UPDATE:
      const update_stitch_type_design_id = action.update_stitch_type_design_id;
      return { ...state, update_stitch_type_design_id };

    case CONST_STITCH.STITCH_TYPE_DESIGN_DELETE:
      const delete_stitch_type_design_id = action.delete_stitch_type_design_id;
      return { ...state, delete_stitch_type_design_id }; 
    
    default:
      return state;
  }
};
