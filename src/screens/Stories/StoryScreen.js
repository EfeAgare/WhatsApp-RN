import React from "react";
import { View } from "react-native";
import { StoryPage } from "../Story";

export default class StoryScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <StoryPage
        id={props.navigation.getParam("uid")}
        user={props.navigation.getParam("user")}
        allUsers={props.navigation.getParam("allUsers") || []}
      />
    );
  }
}
