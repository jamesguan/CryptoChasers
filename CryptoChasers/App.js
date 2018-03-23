/**
 * Made for CryptoChasers Confidential group
 */
import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from "./src/store";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MainPage from './src/views/MainPage';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <MainPage />
      </Provider>
    );
  }
}
