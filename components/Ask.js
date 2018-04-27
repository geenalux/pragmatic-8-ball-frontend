import React from "react"
import { StyleSheet, Text, View, Button, TextInput, Picker } from "react-native"
import { Dropdown } from 'react-native-material-dropdown';

import { StackNavigator } from "react-navigation"
import { connect } from "react-redux"

export class Ask extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  componentDidMount() {
    this.props.fetchEightBallsFromServer();
  }

  render() {
    // let data = [{
    //   value: 'Will I...',
    // }, {
    //   value: 'Should I...',
    // }, {
    //   value: 'Where should I...',
    // }, {
    //   value: 'Who will...',
    // }, {
    //   value: 'Classic 8 Ball Mode',
    // }];
    let data = []
    let eightBalls = this.props.eightBalls
    eightBalls.forEach(element => {
      let valObj = {}
      valObj['value'] = element.name
      data.push(valObj)
    });
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

const mapState = state => { eightBalls: state.eightBalls }

const mapDispatch = dispatch => {
  return {
    fetchEightBallsFromServer = () => dispatch(fetchEightBalls())
  }
}

export default connect(mapState, mapDispatch)(Ask)
