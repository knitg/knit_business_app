import React from "react";
import { View, Text, Tab } from "native-base";
import HeaderToolBar from "../components/HeaderToolBar";
import ProductCard from "../components/ProductCard";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import KTabs from "../components/Tabs";
import Stitch from "./Stitch";
import StitchTypeDesign from "./StitchTypeDesign";
import StitchType from "./StitchType";
import User from "./User";
import UserType from "./UserType";
import UserRole from "./UserRole";

const ScreenByCode = code => {
  switch (code) {
    case "stitch":
      return <Stitch />;
    case "stitch_type":
      return <StitchType />;
    case "stitch_type_design":
      return <StitchTypeDesign />;
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

function Dashboard(props) {
  const tabs = [
    { id: 1, type: "Stitch", code: "stitch" },
    { id: 2, type: "Stitch Type", code: "stitch_type" },
    { id: 3, type: "Stitch Design", code: "stitch_type_design" },
    { id: 4, type: "Add User", code: "add_user" },
    { id: 5, type: "User Type", code: "user_type" },
    { id: 6, type: "User Role", code: "user_role" }
  ];
  return (
    <View style={{ flex: 1 }}>
      <HeaderToolBar showBack={true} showSearch={true}></HeaderToolBar>
      <KTabs>
        {tabs.map((tab, index) => (
          <Tab heading={tab.type}>{ScreenByCode(tab.code)}</Tab>
        ))}
      </KTabs>
    </View>
  );
}

export default Dashboard;
