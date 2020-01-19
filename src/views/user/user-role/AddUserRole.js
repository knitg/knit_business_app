import React from "react";
import { View, Text, Container } from "native-base";
 
import { StyleSheet } from "react-native";

function AddUserRole(props) {
  return (
    <View style={{ flex: 1 }}>
    <Text>ADD USER ROLE SCREEN</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 25,
    height: 22,
    color: 'white',
  },
});
export default AddUserRole;
