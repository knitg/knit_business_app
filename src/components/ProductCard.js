import React from "react";
import { Image } from "react-native";
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
  Right
} from "native-base";

const ProductCard = props => {
  const { title, description, price } = props;
  return (
    <Card>
      <CardItem>
        <Left>
          <Body>
            <Text>Blouse</Text>
            <Text note>Blouse description</Text>
          </Body>
        </Left>
        <Right>
          <Text>
            {" "}
            {"\u20B9"} <Text style={{ fontSize: 18 }}>140</Text>
          </Text>
        </Right>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{ uri: "https://picsum.photos/200/300" }}
          style={{ height: 200, width: null, flex: 1 }}
        />
      </CardItem>
     
    </Card>
  );
};

export default ProductCard;
