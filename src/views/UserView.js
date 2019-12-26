import React, {useEffect} from "react";
import { View, Text, Tab } from "native-base";
import HeaderToolBar from "../components/HeaderToolBar";
import KTabs from "../components/Tabs";
import User from "./user/User";
import UserType from "./user/UserType";
import UserRole from "./user/UserRole";

const tabs = [
  { id: 1, type: "Add User", code: "add_user" },
  { id: 2, type: "User Type", code: "user_type" },
  { id: 3, type: "User Role", code: "user_role" }
];
const ScreenByCode = code => {
  switch (code) {
    case "add_user":
      return <User />;
    case "user_type":
      return <UserType />;
    case "user_role":
      return <UserRole />;
    default:
      return null;
  }
};
const UserView = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <HeaderToolBar showBack={true} showSearch={true}></HeaderToolBar>
      <KTabs>
        {tabs.map((tab, index) => (
          <Tab key={index} heading={tab.type}>
            {ScreenByCode(tab.code)}
          </Tab>
        ))}
      </KTabs>
    </View>
  );
};

export default UserView;
