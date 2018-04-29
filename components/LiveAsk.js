import React from "react"
import { StyleSheet, Text, View, Button, TextInput } from "react-native"
import { Dropdown } from 'react-native-material-dropdown';
import RNShakeEvent from 'react-native-shake-event'

import { StackNavigator } from "react-navigation"
import { connect } from "react-redux"
import { fetchEightBalls, postQuestion } from "../reducers"

class LiveAsk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eightBallId: 6,
      input: ''
    };
  }

  componentDidMount() {
    this.props.fetchEightBallsFromServer();
    this.handlePress = this.handlePress.bind(this)
    RNShakeEvent.addEventListener('shake', () => {
      this.handlePress(this.state)
    })
  }

  handlePress(localState) {
    let questionBody = { eightBallId: this.state.eightBallId, input: this.state.input, responseContent: null }
    this.props.sendQuestionToServer(questionBody)
    this.props.navigation.navigate('LiveAnswerPage')
  }

  render() {
    return(
      <View>
        <Text style={{ fontSize: 28, color: "purple" }}>Live Mode: Ask a human!</Text>
        <Text style={{ fontSize: 28, color: "black" }}>What's on your mind?</Text>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(input) => {
          this.setState({input})
        }}
        value={this.state.input}
        />
        <Button disabled={this.state.input.length < 1} onPress={() => this.handlePress(this.state)} title="Shake to ask your question!" />
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
    eightBalls: state.eightBalls
  };
};
const mapDispatch = function(dispatch) {
  return {
    fetchEightBallsFromServer: function() {
      return dispatch(fetchEightBalls());
    },
    sendQuestionToServer: function(questionBody) {
      return dispatch(postQuestion(questionBody))
    }
  };
};
export default connect(mapState, mapDispatch)(LiveAsk)
