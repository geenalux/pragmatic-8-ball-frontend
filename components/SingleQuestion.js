import React from "react"
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableHighlight } from "react-native"

import { StackNavigator } from "react-navigation"
import { connect } from "react-redux"
import { fetchQuestion } from "../reducers"

class SingleQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionId: 0,
      content: ''
    };
  }

  componentDidMount() {
    // this.props.fetchQuestionFromServer(questionId)
  }


  render() {
    return(
      <View style={styles.container}>
        <Text style={{ fontSize: 28, color: "purple" }}>Question:</Text>
        <Text style={{ fontSize: 28, color: "black", fontWeight: "bold" }}>{this.props.question.input}</Text>
        <Text style={{ fontSize: 28, color: "purple" }}>Responses:</Text>
        <FlatList
        data={this.props.question.liveResponses}
        renderItem={({ item }) => {
          return (
            <View key={item.id}>
                <Text style={styles.answer}>
                {item.content}
                </Text>
            </View>
          );
        }}
        />
        <Text style={{ fontSize: 24, color: "purple" }}>Add a response:</Text>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(content) => {
          this.setState({content})
        }}
        value={this.state.content}
        />
        <Button onPress={() => this.handlePress(this.state)} title="Send" />
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
    question: state.question,
  };
};

const mapDispatch = function(dispatch) {
  return {
    fetchQuestionFromServer: function(questionId) {
      return dispatch(fetchQuestion(questionId));
    }
  };
};

export default connect(mapState, mapDispatch)(SingleQuestion)
