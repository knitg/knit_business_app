import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";

import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons"; 
import Profile from "../views/Profile";
import User from "../views/user/User";
import Vendor from "../views/Vendor";
import StitchView from "../views/StitchView";
import UserView from "../views/UserView";

console.disableYellowBox = true;

const MainTabStack = createBottomTabNavigator({ 
  Stitch: {
    screen: StitchView,
    navigationOptions: {
      tabBarLabel: "Stitch",
      tabBarIcon: () => (
        <MaterialIcons
          name="nfc"
          size={30}
          color="#0564A4"
        />
      )
    }
  },
  User: {
    screen: UserView,
    navigationOptions: {
      tabBarLabel: "User",
      tabBarIcon: () => (
        <FontAwesome
          name="users"
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
