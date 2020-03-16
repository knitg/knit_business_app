import { CONST_VENDOR } from "../../constants/vendor.constant";

const initialState = {};

export default vendorReducer = (state = initialState, action) => {
  console.log("ACTIONNNNN >>>>> ", action);
  switch (action && action.type) {
    
    case CONST_VENDOR.VENDOR_LOADING:
      const loading = action.loading;
      return { ...state, loading };

    /***
     *  >>>>> VENDOR CRUD <<<<<<<
     * */

    case CONST_VENDOR.VENDOR_LIST:
      console.log("VENDOR LIST ", CONST_VENDOR.VENDOR_LIST);
      const vendorList = action.data;
      return { ...state, vendorList };

    case CONST_VENDOR.VENDOR_ADD:
      console.log("action >>> ", action);
      const vendor_id = action.data;
      return { ...state, vendor_id };

    case CONST_VENDOR.VENDOR_DETAIL:
      console.log("action >>> ", action);
      const vendorDetail = action.data;
      return { ...state, vendorDetail };

    case CONST_VENDOR.VENDOR_UPDATE:
      const update_vendor_id = action.data;
      return { ...state, update_vendor_id };

    case CONST_VENDOR.VENDOR_DELETE:
      const delete_vendor_id = action.data;
      return { ...state, delete_vendor_id };

    default:
      return state;
  }
};
