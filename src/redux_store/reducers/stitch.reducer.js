import { CONST_STITCH } from "../constants/stitch.constant";

const initialState = {};

export default stitchReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case CONST_STITCH.STITCH_LIST:
      const stitchlist = action.stitch;
      return { ...state, stitchlist };
      
    case CONST_STITCH.STITCH_TYPE_LIST:
      const stitchtypeList = action.stitchtypeList;
      return { ...state, stitchtypeList };

    case CONST_STITCH.STITCH_DETAIL:
      const stitchdetails = action.stitchdetail;
      return { ...state, stitchdetails };

    case CONST_STITCH.STITCH_ADD:
      const stitch_id = action.stitch_id;
      return { ...state, stitch_id };

    case CONST_STITCH.STITCH_TYPE_ADD:
      const stitch_type_id = action.stitch_type_id;
      return { ...state, stitch_type_id };

    case CONST_STITCH.STITCH_TYPE_DESIGN_ADD:
      const stitch_type_design_id = action.stitch_type_design_id;
      return { ...state, stitch_type_design_id };

    case CONST_STITCH.STITCH_UPDATE:
      const update_stitch_id = action.update_stitch_id;
      return { ...state, update_stitch_id };

    case CONST_STITCH.STITCH_DELETE:
      const delete_stitch_id = action.delete_stitch_id;
      return { ...state, delete_stitch_id };

    default:
      return state;
  }
};
