import React from "react"
import { StyleSheet, Text, View, Button, TextInput, Picker } from "react-native"
import { Dropdown } from 'react-native-material-dropdown';

import { StackNavigator } from "react-navigation"
import { connect } from "react-redux"
import { fetchEightBalls, postQuestion } from "../reducers"

class Ask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eightBallIndex: 0,
      eightBallId: '',
      input: ''
    };
  }

  componentDidMount() {
    this.props.fetchEightBallsFromServer();
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress(localState) {
    const responses = this.props.eightBalls[this.state.eightBallIndex].responses
    // randomly select response
    let responseId = 1;
    let questionBody = { eightBallId: this.state.eightBallId, input: this.state.input, responseId }
    this.props.sendQuestionToServer(questionBody)
    this.props.navigation.navigate('AnswerPage')
  }

  render() {
    // console.log("Local State EightBallIndex:", this.state.eightBallIndex)
    // console.log("Local State EightBallId:", this.state.eightBallId)
    // console.log("Local State Input:", this.state.input)
    let data = []
    let eightBalls = this.props.eightBalls
    eightBalls.forEach(element => {
      let valObj = {}
      valObj['eightBallId'] = element.id
      valObj['value'] = element.name
      data.push(valObj)
    });
    return(
      <View>
        <Text style={{ fontSize: 36, color: "purple" }}>What's on your mind?</Text>
        <Dropdown style={{width: 500}}
          label='Ask a question'
          data={data}
          onChangeText={(data,index) => this.setState({ eightBallIndex: index, eightBallId: index + 1 })} />
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(input) => {
          this.setState({input})
        }}
        value={this.state.input}
        />
        <Button onPress={() => this.handlePress(this.state)} title="Shake to ask your question!" />
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
      dispatch(postQuestion(questionBody))
    }
  };
};

export default connect(mapState, mapDispatch)(Ask)
