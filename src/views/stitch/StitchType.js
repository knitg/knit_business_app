import React from "react";
import { View, Text } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../../components/ProductCard"; 
import KFab from "../../components/KFab";

function StitchType(props) {
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
      </ScrollView>
      <KFab></KFab>
    </View>
  );
}

export default StitchType;
