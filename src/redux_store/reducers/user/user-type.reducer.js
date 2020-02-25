import { CONST_USER } from "../../constants/user.constant";

const initialState = {};

export default userTypeReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {

    case CONST_USER.USER_LOADING:
      const loading = action.loading
      return { ...state, loading};

    /*** 
     *  >>>>> USER TYPE CRUD <<<<<<<
     * */
          
    case CONST_USER.USER_TYPE_LIST:
      const usertypeList = action.data;
      return { ...state, usertypeList };

    case CONST_USER.USER_TYPE_ADD:
      console.log('action >>> ', action);
      const user_type_id = action.data;
      return { ...state, user_type_id };
    
    case CONST_USER.USER_TYPE_UPDATE:
      const update_user_type_id = action.data;
      return { ...state, update_user_type_id };

    case CONST_USER.USER_TYPE_DELETE:
      const delete_user_type_id = action.data;
      return { ...state, delete_user_type_id };
    
    default:
      return state;
  }
};
