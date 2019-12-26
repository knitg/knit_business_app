import React from "react";
import { View, Text } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../../components/ProductCard";

function StitchTypeDesign(props) {
  return (
    <ScrollView>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
    </ScrollView>
  );
}

export default StitchTypeDesign;
