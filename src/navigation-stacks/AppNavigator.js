import { createStackNavigator } from "react-navigation-stack";
import MainTabStack from "./MainTabStack";
import Login from "../views/Login";
import Register from "../views/Register";

console.disableYellowBox = true;

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: () => ({
        headerTransparent: true,
        headerBackTitle: null
      })
    },
    Register: {
      screen: Register,
      navigationOptions: () => ({
        // headerTransparent: true,
        headerBackTitle: null
      })
    },
    Layout: {
      screen: MainTabStack,
      navigationOptions: () => ({
        header: null
      })
    }
  },
  {
    initialRouteName: "Login",
    headerMode: "screen",
    mode: "modal",
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default AppNavigator;
