/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, Text} from 'react-native';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen';
import NotesList from './src/screens/NotesList';
import SettingsScreen from './src/screens/SettingsScreen';

const App = () => {
  return <AppContainer />;
};

const AppSwitchNavigator = createSwitchNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    List: {
      screen: NotesList,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    initialRouteName: 'Login',
  },
);

const AppContainer = createAppContainer(AppSwitchNavigator);
export default App;
