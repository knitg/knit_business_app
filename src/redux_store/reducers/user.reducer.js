import { CONST_USER } from "../constants/user.constant";

const initialState = {};

export default userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONST_USER.USER_LIST:
      const users = action.users
      return { ...state, users };
    case CONST_USER.USER_DETAIL:
      const userdetails = action.userdetail
      return { ...state, userdetails };

    default:
      return state;
  }
};
