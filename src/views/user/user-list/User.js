import React, { useEffect, useState } from "react";
import { View } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { getUserListAction } from "../../../redux_store/actions/users/user-list.actions";

import { bindActionCreators } from "redux";
import { connect } from "react-redux"; 

import UserList from "./UserList";
import UserDetail from "./UserDetail";
import AddUser from "./AddUser";
import { getUserDetailAction } from "../../../redux_store/actions/users/user-detail.actions";
import KFab from "../../../components/KFab";


const User = (props) => {
  const [active, setActive] = useState(false);
  const [userListVisible, setUserListVisible] = useState(true);
  const [userDetailVisible, setUserDetailVisible] = useState(false);
  const [newUserVisible, setNewUserVisible] = useState(false);

  /**
   * Below click event handles the user details visible against the click
   * @param {*} user - clicked user details
   */
  const showUserDetail = (user) => {
    props.getUserDetail(user.id);
    // visible user detail screen
    setUserDetailVisible(true);
    // making false to hide the screens
    setUserListVisible(false);
    setNewUserVisible(false);
  }
  /**
   * Below click event handles the user List visible against the click
   * @param {*} user - clicked user details
   */
  const showUserList = () => {
    console.log("clicked")
    // visible user detail screen
    setUserListVisible(true);
    // making false to hide the screens
    setNewUserVisible(false);
    setUserDetailVisible(false);
  }
  
  /**
   * Below click event handles the user List visible against the click
   * @param {*} user - clicked user details
   */
  const showNewUser = () => {
    console.log("clicked")
    // visible user detail screen
    setNewUserVisible(true);
    // making false to hide the screens
    setUserListVisible(false);
    setUserDetailVisible(false);
  }

  useEffect(() => {
    props.getUserList();
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {/* USER LIST SCREEN */}
        {userListVisible ?
          <UserList users={props.users} clickedItem={showUserDetail} ></UserList>
          : null
        }
        {/* USER DETAILS SCREEN */}
        {userDetailVisible ?
          <UserDetail user={props.userDetail} backButtonPressed={showUserList}></UserDetail>
          : null
        }
        {/* USER ADD SCREEN */}
        {newUserVisible ?
          <AddUser cancelClick={showUserList}></AddUser>
          : null
        }
      </ScrollView>
       <KFab fabClicked={(status) => status ? showUserList() : showNewUser()}></KFab>
       
       </View>
  );
}
const mapStateToProps = ({ user }) => {
  return {
    users: user.users,
    userDetail: user.userdetails
  }
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUserList: getUserListAction,
      getUserDetail: getUserDetailAction
    },
    dispatch
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(User); 