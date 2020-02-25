import { combineReducers } from 'redux';

import stitchReducer from './stitch/stitch.reducer';
import stitchTypeReducer from './stitch/stitch-type.reducer';
import stitchTypeDesignReducer from './stitch/stitch-type-design.reducer';

import userReducer from './user/user.reducer';
import userTypeReducer from './user/user-type.reducer';
import vendorReducer from './vendor/vendor.reducer';

import productReducer from './product/product.reducer';

/*** 
 * ROOT REDUCER 
 * 
 * */
export const rootReducer = combineReducers({

  /** USER REDUCER */
  user: userReducer,
  userType: userTypeReducer,

  /** VENDOR REDUCER */
  vendor: vendorReducer,

  /** Product Reducer */
  product: productReducer,

  /** STITCH REDUCER */
  stitch: stitchReducer,
  stitchType: stitchTypeReducer,
  stitchTypeDesign: stitchTypeDesignReducer
});
