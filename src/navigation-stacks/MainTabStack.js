import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";

import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";
import Dashboard from "../views/Dashboard";
import Profile from "../views/Profile";
import User from "../views/user/User";
import Vendor from "../views/Vendor";

console.disableYellowBox = true;

const MainTabStack = createBottomTabNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      tabBarLabel: "Dashboard",
      tabBarIcon: () => (
        <MaterialCommunityIcons
          name="desktop-mac-dashboard"
          size={30}
          color="#0564A4"
        />
      )
    }
  },
  Vendors: {
    screen: Vendor,
    navigationOptions: {
      tabBarLabel: "Vendors",
      tabBarIcon: () => (
        <MaterialIcons name="person-pin" size={30} color="#0564A4" />
      )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: () => (
        <MaterialCommunityIcons name="face-profile" size={30} color="#0564A4" />
      )
    }
  }
});

export default MainTabStack;
