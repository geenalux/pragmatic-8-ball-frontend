import React from "react"
import { StyleSheet, Text, View, Button, TextInput } from "react-native"
import { Dropdown } from 'react-native-material-dropdown';
import RNShakeEvent from 'react-native-shake-event'

import { StackNavigator } from "react-navigation"
import { connect } from "react-redux"
import { postLiveQuestion } from "../reducers"

class LiveAsk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  componentDidMount() {
    this.handlePress = this.handlePress.bind(this)
    RNShakeEvent.addEventListener('shake', () => {
      this.handlePress(this.state)
    })
  }

  handlePress(localState) {
    let questionBody = { input: this.state.input, responseContent: null }
    this.props.sendLiveQuestionToServer(questionBody)
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
    liveQuestion: state.liveQuestion
  };
};
const mapDispatch = function(dispatch) {
  return {
    sendLiveQuestionToServer: function(questionBody) {
      return dispatch(postLiveQuestion(questionBody))
    }
  };
};
export default connect(mapState, mapDispatch)(LiveAsk)
