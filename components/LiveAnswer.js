import React from "react"
import { StyleSheet, Text, View, Button, FlatList, TouchableHighlight } from "react-native"

import { StackNavigator } from "react-navigation"
import { connect } from "react-redux"
import { fetchEightBall } from "../reducers"

class LiveAnswer extends React.Component {

  componentDidMount() {
    let liveEightBallId = 6
    this.props.fetchEightBallFromServer(liveEightBallId)
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={{ fontSize: 28, color: "purple" }}>You asked...</Text>
        <Text style={styles.answer}>{this.props.question.input}</Text>
        <Text style={{ fontSize: 28, color: "purple" }}>Get ready for pragmatic answers from pragmatic people!</Text>
        <Button onPress={() => this.props.navigation.navigate("LiveQuestionsList")} title="See all Live questions" />
        <Button onPress={() => this.props.navigation.navigate('LiveQuestion')} title="Ask another Live question" />
        <Button onPress={() => this.props.navigation.navigate('Main')} title="Back to Home" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  answer: {
    padding: 10,
    fontSize: 28,
    fontWeight: "bold"
  }
})

const mapState = function(state) {
  return {
    question: state.question,
    eightBall: state.eightBall
  };
};

const mapDispatch = function(dispatch) {
  return {
    fetchEightBallFromServer: function(eightBallId) {
      return dispatch(fetchEightBall(eightBallId));
    },
    sendQuestionToServer: function(questionBody) {
      dispatch(postQuestion(questionBody))
    }
  };
};

export default connect(mapState, mapDispatch)(LiveAnswer)
