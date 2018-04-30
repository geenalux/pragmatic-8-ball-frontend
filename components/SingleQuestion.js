import React from "react"
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableHighlight } from "react-native"

import { StackNavigator } from "react-navigation"
import { connect } from "react-redux"
import { fetchLiveQuestions, fetchLiveQuestion, postLiveResponse, fetchLiveResponses } from "../reducers"

class SingleQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionId: 0,
      content: ''
    };
  }

  componentDidMount() {
    // this.props.fetchLiveResponsesFromServer()
  }

  handlePress(localState) {
    let responseObj = { content: this.state.content, liveQuestionId: this.props.liveQuestion.id }
    this.props.sendResponseToServer(responseObj)
    // this.props.fetchLiveResponsesFromServer()
    // this.props.fetchLiveQuestionsFromServer()
  }

  clearText = () => {
    this._textInput.setNativeProps({text: ''});
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={{ fontSize: 28, color: "purple" }}>Question:</Text>
        <Text style={{ fontSize: 28, color: "black", fontWeight: "bold" }}>{this.props.liveQuestion.input}</Text>
        <Text style={{ fontSize: 28, color: "purple" }}>Responses:</Text>
        <FlatList
        data={this.props.responses}
        renderItem={({ item }) => {
          return (
            <View>
                <Text style={styles.answer}>
                {item.content}
                </Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        />
        <Text style={{ fontSize: 24, color: "purple" }}>Add a response:</Text>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        ref={component => this._textInput = component}
        onChangeText={(content) => {
          this.setState({content})
          // this.props.fetchLiveQuestionFromServer(this.props.liveQuestion.id)
        }}
        value={this.state.content}
        />
        <Button disabled={this.state.content.length < 1} onPress={() => {
          this.clearText()
          return this.handlePress(this.state)}
         } title="Send" />
        <Button onPress={() => this.props.navigation.navigate('LiveQuestion')} title="Ask a question in Live Mode" />
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
  answer: {
    padding: 10,
    borderWidth: 0.5,
    fontSize: 22
  }
})

const mapState = function(state) {
  return {
    liveQuestion: state.liveQuestion,
    responses: state.responses.filter(response =>
      response.liveQuestionId === state.liveQuestion.id)
  };
};

const mapDispatch = function(dispatch) {
  return {
    fetchLiveQuestionsFromServer: function() {
      return dispatch(fetchLiveQuestions());
    },
    fetchLiveResponsesFromServer: function() {
      return dispatch(fetchLiveResponses());
    },
    fetchLiveQuestionFromServer: function(questionId) {
      return dispatch(fetchLiveQuestion(questionId));
    },
    sendResponseToServer: function(responseBody) {
      dispatch(postLiveResponse(responseBody))
    }
  };
};

export default connect(mapState, mapDispatch)(SingleQuestion)
