import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import stitchReducer from './stitch.reducer';
const INITIAL_STATE = {
};

export const rootReducer = combineReducers({
  user: userReducer,
  stitch: stitchReducer
});
