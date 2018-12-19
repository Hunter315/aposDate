import React from "react";
import Home from "../screens/Home.js";
import Profile from "../screens/Profle.js";
import Matches from "../screens/Matches.js";
import { createMaterialTopTabNavigator as TabNavigator } from "react-navigation";

export default TabNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Profile"
      }
    },
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home"
      }
    },
    Matches: {
      screen: Matches,
      navigationOptions: {
        tabBarLabel: "Matches"
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarPosition: "top",
    initialRouteName: "Home",
    animationEnabled: true,
    swipeEnabled: false,
    tabBarOptions: {
      upperCaseLabel: false,
      style: {
        height: 40,

        backgroundColor: "#555"
      }
    }
  }
);
