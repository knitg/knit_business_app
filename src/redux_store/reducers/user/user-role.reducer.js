import { CONST_USER } from "../../constants/user.constant";

const initialState = {};

export default userRoleReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {

    case CONST_USER.USER_LOADING:
      const loading = action.loading
      return { ...state, loading};

    /*** 
     *  >>>>> USER ROLE CRUD <<<<<<<
     * */
          
    case CONST_USER.USER_ROLE_LIST:
      const userRoleList = action.data;
      return { ...state, userRoleList };

    case CONST_USER.USER_ROLE_ADD:
      console.log('action >>> ', action);
      const user_role_id = action.data;
      return { ...state, user_role_id };
    
    case CONST_USER.USER_ROLE_UPDATE:
      const update_user_role_id = action.data;
      return { ...state, update_user_role_id };

    case CONST_USER.USER_ROLE_DELETE:
      const delete_user_role_id = action.data;
      return { ...state, delete_user_role_id };
    
    default:
      return state;
  }
};
