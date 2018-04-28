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
      <View>
        <Text style={{ fontSize: 36, color: "purple" }}>You asked...</Text>
        <Text style={{ fontSize: 36, color: "black" }}>{this.props.question.input}</Text>
        <Text style={{ fontSize: 36, color: "purple" }}>Your question has been asked to the world!</Text>
        <Button onPress={() => this.props.navigation.navigate("LiveQuestionsList")} title="See all Live questions" />
        <Button onPress={() => this.props.navigation.navigate('LiveQuestion')} title="Ask another question" />
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
