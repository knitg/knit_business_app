import React from "react";
import { Image, TouchableHighlight } from "react-native";

import { Card, CardItem, Text, Left, Body, Right, View } from "native-base";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImageSwiper from "./ImageSwiper";

const ProductCard = props => {
  const { images } = props; 
  const editActionClick = (selectedItem) => {
    props.editIconClick(selectedItem);
  }
  return (
    <Card>
      <CardItem>
        <Left>
          <Body>
            <Text>{props.type.stype}</Text>
            <Text note>{props.type.description}</Text>
          </Body>
        </Left>
        <Right>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableHighlight onPress={() => editActionClick(props.type)}>
              <FontAwesome style={{ padding: 10, alignSelf: 'center' }} name="edit" size={32} color="grey"
                onPress={props.editIconClick}
              />
            </TouchableHighlight>
            <TouchableHighlight onPress={props.trashIconClick}>
              <FontAwesome style={{ padding: 10, alignSelf: 'center' }} name="trash" size={32} color="red" />
            </TouchableHighlight>
          </View>
        </Right>
      </CardItem>
      { images.length >= 1 ? 
        <CardItem cardBody >
            <ImageSwiper images={images}></ImageSwiper>
        </CardItem>
        : <CardItem cardBody>
             
          </CardItem>
      }
    </Card>
  );
};

export default ProductCard;
