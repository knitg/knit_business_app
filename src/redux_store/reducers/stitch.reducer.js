import { CONST_STITCH } from "../constants/stitch.constant";

const initialState = {};

export default stitchReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case CONST_STITCH.STITCH_LIST:
      const stitchlist = action.stitch
      return { ...state, stitchlist };

    case CONST_STITCH.STITCH_DETAIL:
      const stitchdetails = action.stitchdetail
      return { ...state, stitchdetails };
      
    case CONST_STITCH.STITCH_ADD:
      const stitch_id = action.stitch_id
      return { ...state, stitch_id };

    default:
      return state;
  }
};
