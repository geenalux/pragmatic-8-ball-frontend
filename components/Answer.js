import React from "react"
import { StyleSheet, Text, View, Button } from "react-native"

import { StackNavigator } from "react-navigation"
import { connect } from "react-redux"

class Answer extends React.Component {

  componentDidMount() {

  }

  render() {
    return(
      <View>
        <Text style={{ fontSize: 36, color: "purple" }}>You asked...</Text>
        <Text style={{ fontSize: 36, color: "black" }}>{this.props.question.input}</Text>
        <Text style={{ fontSize: 36, color: "purple" }}>Pragmatic 8 Ball says...</Text>
        <Text style={{ fontSize: 36, color: "black" }}>{this.props.question.responseContent}</Text>
        <Button onPress={() => this.props.navigation.navigate('AskQuestion')} title="Ask another question" />
        <Button onPress={() => this.props.navigation.navigate('LiveQuestion')} title="Need a more pragmatic answer? Ask a human!" />
        <Button onPress={() => this.props.navigation.navigate('Main')} title="Back to Home" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})

const mapState = function(state) {
  return {
    question: state.question
  };
};

const mapDispatch = function(dispatch) {
  return {
    sendQuestionToServer: function(questionBody) {
      dispatch(postQuestion(questionBody))
    }
  };
};

export default connect(mapState, mapDispatch)(Answer)
