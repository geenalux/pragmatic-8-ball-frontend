import React from "react"
import { StyleSheet, Text, View, Image, Button } from "react-native"
import { StackNavigator } from "react-navigation"

import { Provider } from "react-redux";
import store from "../store";

export default Home = ({ navigation }) => (
  <Provider store={store}>
    <View style={styles.container}>
      <Text style={{ fontSize: 36, color: "purple" }}>Pragmatic 8 Ball</Text>
      <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/8_ball_icon.svg/500px-8_ball_icon.svg.png" }} style={styles.logo} />
      <View style={styles.askButton}>
        <Button onPress={() => navigation.navigate("AskQuestion")} title="Ask the 8 ball" />
        <Button onPress={() => navigation.navigate("LiveQuestion")} title="Live Mode: Ask a question" />
        <Button onPress={() => navigation.navigate("LiveQuestionsList")} title="Answer a question" />
      </View>
    </View>
  </Provider>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  askButton: {
    borderRadius: 9
  },
  logo: {
    width: 250,
    height: 250,
  }
})
