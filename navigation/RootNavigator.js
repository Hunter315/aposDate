import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import TabNavigator from './TabNavigator.js';
import Chat from '../screens/Chat';

const RootStackNavigator = createStackNavigator(
    {
        Main: {
            screen: TabNavigator,
        },
        Chat: {
            screen: Chat,
          },
    }
);

//My main app container that react will render
const AppContainer = createAppContainer(RootStackNavigator);

export default class RootNavigator extends React.Component {
    render() {
        return <AppContainer/>;
    }
}