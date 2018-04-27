import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StackNavigator } from "react-navigation"

import { Provider } from "react-redux"
import store from "./store"

import Home from "./components/Home"
import Ask from "./components/Ask"

const RootNavigator = StackNavigator({
  Main: {
    screen: Home,
    navigationOptions: {
      headerTitle: "Home"
    }
  },
  AskQuestion: {
    screen: Ask,
    navigationOptions: {
      headerTitle: "Ask"
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
