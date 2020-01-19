import React from "react";
import { Image, TouchableHighlight } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  View
} from "native-base";

import FontAwesome from 'react-native-vector-icons/FontAwesome';


const ProductCard = props => {
  const { title, description, price } = props; 
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
            <TouchableHighlight onPress={props.editIconClick}>
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
      {props.type.images.length >= 1 ? 
      <CardItem cardBody>
        <Image
          source={{ uri: props.type.images[0].image}}
          style={{ height: 200, width: null, flex: 1 }}
        />
        {/* <ImageSwiper></ImageSwiper> */}
      </CardItem>
      : null }

    </Card>
  );
};

export default ProductCard;
