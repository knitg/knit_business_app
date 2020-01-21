import { CONST_STITCH } from "../../constants/stitch.constant";

const initialState = {};

export default stitchTypeDesignReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {

    case CONST_STITCH.STITCH_LOADING:
      const loading = action.loading
      return { ...state, loading};

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
