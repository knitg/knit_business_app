import React from 'react';
import { View, Text } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import ProductCard from '../components/ProductCard';

function Stitch(props) {
    return (
        <ScrollView>
          <ProductCard></ProductCard>
        </ScrollView>
    );
}

export default Stitch;