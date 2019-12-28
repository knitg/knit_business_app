import React from "react";
import { View, Text } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../../components/ProductCard"; 
import KFab from "../../components/KFab";

function StitchType(props) {
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Text>COMING SOON</Text>
      </ScrollView>
      <KFab></KFab>
    </View>
  );
}

export default StitchType;
