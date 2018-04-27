import React from "react"
import { StyleSheet, Text, View, Button, TextInput, Picker } from "react-native"
import { Dropdown } from 'react-native-material-dropdown';

import { StackNavigator } from "react-navigation"
import { connect } from "react-redux"

export default class Ask extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    let data = [{
      value: 'Will I...',
    }, {
      value: 'Should I...',
    }, {
      value: 'Where should I...',
    }, {
      value: 'Who will...',
    }, {
      value: 'Classic 8 Ball Mode',
    }];
    return(
      <View>
      <Text style={{ fontSize: 36, color: "purple" }}>What's on your mind?</Text>
      <Dropdown style={{width: 500}}
        label='Ask a question'
        data={data}
      />
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      <Button title="Shake to ask your question!" />
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
