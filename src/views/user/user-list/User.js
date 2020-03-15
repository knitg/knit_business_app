import React, { useEffect, useState, useReducer } from "react";
import { View, Container } from "native-base";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  getUserListAction,
  getUserDetailAction,
  deleteUserAction
} from "../../../redux_store/actions/users/crud-user.actions";
import FlatUserCardList from "../../../components/card/FlatUserCardList";
import Loader from "../../../components/Loader";

import AddUser from "./AddUser";
import KFab from "../../../components/fab/KFab";
import { getUserTypeListAction } from "../../../redux_store/actions/users/crud-user-type.actions";


const User = props => {
  console.log("USER COMPONENT CREATE \n\n\n\n", props);

  useEffect(() => {
    console.log("USER CAKKED \n\n\n\n\n\n\n\n\n\n\n\n\n\n")
    props.getUserListAction();
  }, [props.userId, props.deleteUser, props.update_user_id]);
  
  useEffect(() => {
    console.log("USER BACKKK \n\n\n\n\n\n\n\n\n\n\n\n\n\n")
    props.getUserTypeListAction();
  }, [step]);


  /** INITIAL STATE */
  const initialState = {
    isList: true,
    isEdit: false,
    isNew: false
  };
  // SelectedStitchItem data
  const [selectedUser, setSelectedUser] = useState(null);

  /** USE REDUCER METHOD FOR LIST */
  const reducer = (state, action) => {
    console.log("ACTION TYPE ", action);
    switch (action.type) {
      case "LIST":
        console.log("inside LISt");
        return { ...state, isNew: false, isList: true, isEdit: false };
      case "ADD":
        console.log("inside add");
        return { ...state, isNew: true, isList: false, isEdit: false };
      case "EDIT":
        setSelectedUser(action.data);
        props.getUserListAction();
        return { ...state, isNew: false, isList: false, isEdit: true };
      case "DELETE":
        console.log("\n\n\n\n ACTION DELETE ");
        setSelectedUser(action.data);
        const deleteUser = props.deleteUserAction(action.data);
        console.log("deleteUser >>>> ", deleteUser);
        props.getUserListAction();
        return { ...state, isNew: false, isList: false, isEdit: false };
      default:
        return { ...state, isNew: false, isList: true, isEdit: false };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [step, setStep] = useState(null);
 
  return (
    <Container style={{ flex: 1 }}>
      {props.loading ? (
        <Loader></Loader>
      ) : (
        <Container>
          {state.isNew || state.isEdit ? (
            <View
              style={{
                height: "100%",
                borderWidth: 1,
                borderColor: "yellow",
                borderStyle: "solid"
              }}
            >
              <AddUser
                isEditMode={state.isEdit}
                userTypeList= {props.userTypeList}
                selectedUser={selectedUser}
                cancelClick={() => dispatch({ type: "LIST" })}
              ></AddUser>
            </View>
          ) : (
            <Container>
              <FlatUserCardList
                list={props.userList}
                listMethod={props.getUserListAction}
                editAction={editData =>
                  dispatch({ type: "EDIT", data: editData })
                }
                deleteAction = {(id) => dispatch({type: 'DELETE', data: id})}
              ></FlatUserCardList>
            </Container> 
          )}
          {state.isNew && state.isEdit ? null : (
            <KFab
              fabClicked={status =>
                status ? dispatch({ type: "LIST" }) : dispatch({ type: "ADD" })
              }
            ></KFab>
          )}
        </Container>
      )}
    </Container>
  );
};
const mapStateToProps = ({ user, userType }) => {
  console.log("MAPPPPPSSSS STATE ", user);
  return {
    userList: user.userList,
    userTypeList: userType.usertypeList,
    userDetail: user.userdetails,
    loading: user.loading,
    userId: user.user_id,
    update_user_id: user.update_user_id,
    deleteUser: user.delete_user
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getUserListAction: getUserListAction,
      getUserTypeListAction: getUserTypeListAction,
      getUserDetailAction: getUserDetailAction,
      deleteUserAction: deleteUserAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
