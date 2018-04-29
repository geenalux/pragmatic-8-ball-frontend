import React from "react"
import { StyleSheet, Text, View, Button, FlatList, TouchableHighlight } from "react-native"

import { StackNavigator } from "react-navigation"
import { connect } from "react-redux"
import { fetchEightBall, fetchQuestion } from "../reducers"

class LiveQuestions extends React.Component {

  componentDidMount() {
    let liveEightBallId = 6
    this.props.fetchEightBallFromServer(liveEightBallId)
  }

  handlePress(questionId) {
    this.props.fetchQuestionFromServer(questionId)
    this.props.navigation.navigate('SelectedQuestion')
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={{ fontSize: 28, color: "purple" }}>Choose a question to answer or see responses:</Text>
          <FlatList
            data={this.props.eightBall.questions}
            renderItem={({ item }) => {
              return (
                <View key={item.id}>
                  <TouchableHighlight
                    style={styles.button}
                    key={item.id}
                    onPress={() => this.handlePress(item.id)}
                    id={item.id}
                  >
                    <View>
                      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                        {item.input}
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              );
            }}
          />
        <Button onPress={() => this.props.navigation.navigate('AskQuestion')} title="Ask a question in Live Mode" />
        <Button onPress={() => this.props.navigation.navigate('Main')} title="Back to Home" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    padding: 10,
    borderWidth: 0.5
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
    fetchQuestionFromServer: function(questionId) {
      return dispatch(fetchQuestion(questionId));
    },
    sendQuestionToServer: function(questionBody) {
      dispatch(postQuestion(questionBody))
    }
  };
};

export default connect(mapState, mapDispatch)(LiveQuestions)
