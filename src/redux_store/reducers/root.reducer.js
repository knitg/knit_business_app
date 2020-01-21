import { combineReducers } from 'redux';
import userReducer from './user.reducer';

import stitchReducer from './stitch/stitch.reducer';
import stitchTypeReducer from './stitch/stitch-type.reducer';
import stitchTypeDesignReducer from './stitch/stitch-type-design.reducer';

const INITIAL_STATE = {
};

export const rootReducer = combineReducers({
  user: userReducer,
  stitch: stitchReducer,
  stitchType: stitchTypeReducer,
  stitchTypeDesign: stitchTypeDesignReducer
});
