import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StackNavigator } from "react-navigation"

import { Provider } from "react-redux"
import store from "./store"

import Home from "./components/Home"
import Ask from "./components/Ask"
import Answer from "./components/Answer"
import LiveAsk from "./components/LiveAsk"
import LiveAnswer from "./components/LiveAnswer"
import LiveQuestions from "./components/LiveQuestions"
import SingleQuestion from "./components/SingleQuestion"

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
  },
  AnswerPage: {
    screen: Answer,
    navigationOptions: {
      headerTitle: "Answer"
    }
  },
  LiveQuestion: {
    screen: LiveAsk,
    navigationOptions: {
      headerTitle: "Live Ask"
    }
  },
  LiveAnswerPage: {
    screen: LiveAnswer,
    navigationOptions: {
      headerTitle: "Live Answer"
    }
  },
  LiveQuestionsList: {
    screen: LiveQuestions,
    navigationOptions: {
      headerTitle: "Live Questions"
    }
  },
  SelectedQuestion: {
    screen: SingleQuestion,
    navigationOptions: {
      headerTitle: "Live Responses"
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
