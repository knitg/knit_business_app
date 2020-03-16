import { CONST_USER } from "../../constants/user.constant";

const initialState = {};

export default userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONST_USER.USER_LOADING:
      const loading = action.loading
      return { ...state, loading};

    /*** 
     *  >>>>> USER TYPE CRUD <<<<<<<
     * */
          
    case CONST_USER.USER_LIST:
      const userList = action.data;
      return { ...state, userList };

    case CONST_USER.USER_ADD:
      console.log('action >>> ', action);
      const user_id = action.data;
      return { ...state, user_id };

    case CONST_USER.USER_DETAIL:
      console.log('action >>> ', action.data);
      const userDetail = action.data;
      return { ...state, userDetail };
        
    case CONST_USER.USER_UPDATE:
      const update_user_id = action.data;
      return { ...state, update_user_id };

    case CONST_USER.USER_DELETE:
      const delete_user = action.data;
      return { ...state, delete_user };
    
    default:
      return state;
  }
};
