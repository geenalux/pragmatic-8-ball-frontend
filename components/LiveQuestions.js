import React from "react"
import { StyleSheet, Text, View, Button, FlatList, TouchableHighlight } from "react-native"

import { StackNavigator } from "react-navigation"
import { connect } from "react-redux"
import { fetchLiveQuestions, fetchLiveQuestion } from "../reducers"

class LiveQuestions extends React.Component {

  componentDidMount() {
    this.props.fetchLiveQuestionsFromServer()
  }

  handlePress(liveQuestionId) {
    console.log('Live Question Id:', liveQuestionId)
    this.props.fetchLiveQuestionFromServer(liveQuestionId)
    this.props.navigation.navigate('SelectedQuestion')
  }

  render() {
    console.log('Live Questions',this.props.liveQuestions)

    return(
      <View style={styles.container}>
        <Text style={{ fontSize: 28, color: "purple" }}>Answer or see responses for:</Text>
          <FlatList
            data={this.props.liveQuestions}
            renderItem={({ item }) => {
              return (
                <View key={item.id}>
                {console.log("ITEM:",item)}
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
                      <Text style={{ fontSize: 18, color: "grey" }}>
                        {item.liveResponses.length} Responses
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              );
            }}
          />
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
  button: {
    padding: 10,
    borderWidth: 0.5
  }
})

const mapState = function(state) {
  return {
    liveQuestion: state.liveQuestion,
    liveQuestions: state.liveQuestions
  };
};

const mapDispatch = function(dispatch) {
  return {
    fetchLiveQuestionsFromServer: function() {
      return dispatch(fetchLiveQuestions());
    },
    fetchLiveQuestionFromServer: function(liveQuestionId) {
      return dispatch(fetchLiveQuestion(liveQuestionId));
    },
    sendLiveQuestionToServer: function(questionBody) {
      dispatch(postLiveQuestion(questionBody))
    }
  };
};

export default connect(mapState, mapDispatch)(LiveQuestions)
