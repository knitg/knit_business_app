import React from "react";
import { View, Text, Container } from "native-base";

import { Ionicons, Octicons, AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

function AddUser(props) {
  return (
    <View style={{ flex: 1 }}>
      <Text>ADD USER SCREEN</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 25,
    height: 22,
    color: "white"
  }
});
export default AddUser;
