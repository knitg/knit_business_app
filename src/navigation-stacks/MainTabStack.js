import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Profile from "../views/Profile";
import VendorView from "../views/VendorView";
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
    screen: VendorView,
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
},
{
  initialRouteName: "Vendors"  
});

export default MainTabStack;
