import React, {useState} from "react";
import { View, Text } from "native-base";
import { ScrollView } from "react-native-gesture-handler";  
import UserTypeList from "./UserTypeList";
import KFab from "../../../components/KFab";
import AddUserType from "./AddUserType";



function UserType(props) {
  const [newUserTypeVisible, setnewUserTypeVisible] = useState(false);
  const [userTypeVisible, setUserTypeVisible] = useState(true);

  
/**
   * Below click event handles the user List visible against the click
   * @param {*} user - clicked user details
   */
  const showNewUserType = () => {
    console.log("clicked")
    // visible user detail screen
    setnewUserTypeVisible(true);
    // making false to hide the screens
    setUserTypeVisible(false);
    // setUserDetailVisible(false);
  }
  
  /**
   * Below click event handles the user List visible against the click
   * @param {*} user - clicked user details
   */
  const showUserTypeList = () => {
    console.log("clicked")
    // visible user detail screen
    setUserTypeVisible(true);
    // making false to hide the screens
    setnewUserTypeVisible(false);
    // setUserDetailVisible(false);
  }
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {/* USER ADD SCREEN */}
        {userTypeVisible ?
            <UserTypeList></UserTypeList>
            : null
          }
        {/* USER ADD SCREEN */}
        {newUserTypeVisible ?
            <AddUserType cancelClick={showUserTypeList}></AddUserType>
            : null
          }
      </ScrollView>
      <KFab fabClicked={(status) => status ? showUserTypeList() : showNewUserType()}></KFab>
    
    </View>
  );
}

export default UserType;
