import React from 'react';
import styles from './styles.js';
import RootNavigator from './navigation/RootNavigator';
import {  Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
        <RootNavigator/>
    );
  }
}
