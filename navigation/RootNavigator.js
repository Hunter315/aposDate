import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import TabNavigator from './TabNavigator.js';

const RootStackNavigator = createStackNavigator(
    {
        Main: {
            screen: TabNavigator,
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