import React from "react";
import Home from "../screens/Home.js";
import Profile from "../screens/Profle.js";
import Matches from "../screens/Matches.js";
import { createMaterialTopTabNavigator as TabNavigator } from "react-navigation";
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import profileIcon from "../components/ProfileIcon.js";

export default TabNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: ' ',
        icon: profileIcon,
      },
      
    },
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        // tabBarIcon: ({focused}) => (
        //   <Image style={ styles.logo } source={require('../assets/tinder-icon.png')}/>
        // ),
      }
    },
    Matches: {
      screen: Matches,
      navigationOptions: {
        tabBarLabel: 'Matches',
        // tabBarIcon: ({focused}) => (
        //   <Ionicons style={ styles.nav } color={'#df4723'} name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'} size={40}/>
        // ),
      },
    },
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarPosition: 'top',
    initialRouteName: 'Home',
    animationEnabled: true,
    swipeEnabled: false,
    tabBarOptions: {
      style: {
        height: 75,
      },
      showIcon: true
    }
  }
);