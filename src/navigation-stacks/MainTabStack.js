import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';  

import { Ionicons, FontAwesome, MaterialCommunityIcons, Foundation } from '@expo/vector-icons';
import Dashboard from '../views/Dashboard';
import Profile from '../views/Profile'; 

console.disableYellowBox = true;

const MainTabStack = createBottomTabNavigator({
    Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      tabBarLabel: 'Dashboard',
      tabBarIcon: () => <FontAwesome name='wrench' size={25} color='#0564A4' />
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: () => <FontAwesome name='wrench' size={25} color='#0564A4' />
    }
  }
});

export default MainTabStack;
