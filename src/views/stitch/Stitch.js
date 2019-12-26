import React, { useState } from "react";
import { View, Text, Container, Fab } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../../components/ProductCard";
import KFab from "../../components/KFab";
import KFabAction from "../../components/KFabAction";
import ActionButton from "react-native-action-button";

import { Ionicons, Octicons, AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import AddStitch from "./AddStitch";

function Stitch(props) {
  const [active, setActive] = useState(false);
  const [isAddNewVisible, setIsAddNewVisible] = useState(false);

  return (
    <Container style={{ flex: 1 }}> 
        {isAddNewVisible ? (
          <View style={{ height:'100%', borderWidth:1, borderColor:'yellow', borderStyle:'solid'}}>
            <AddStitch></AddStitch>
          </View>
        ) : (
          <ScrollView>
              <ProductCard></ProductCard>              
          </ScrollView>
        )}
      <Fab
        style={{ flex: 1 }}
        active={active}
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: "#5067FF" }}
        position="bottomRight"
        onPress={() => {
          setIsAddNewVisible(!isAddNewVisible);
        }}
      >
        {isAddNewVisible ? (
          <AntDesign name="close" size={32} color="green" />
        ) : (
          <Octicons name="plus" size={32} color="green" />
        )}
        {props.children}
      </Fab>
    </Container>
  );
}
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 25,
    height: 22,
    color: "white"
  }
});
export default Stitch;
