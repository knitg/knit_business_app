import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title
} from "native-base";
import StatusBar from "./StatusBar";
import { SafeAreaView } from "react-native";

const HeaderToolBar = props => {
  const { showSearch, showFavorite, showBack, showMore } = props;
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#000" barStyle="light-content"></StatusBar>
      <Header>
        <Left>
          {showBack ? (
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          ) : null}
        </Left>
        <Body>
          <Title>Header</Title>
        </Body>
        <Right>
          {showSearch ? (
            <Button transparent>
              <Icon name="search" />
            </Button>
          ) : null}
          {showFavorite ? (
            <Button transparent>
              <Icon name="heart" />
            </Button>
          ) : null}
          {showMore ? (
            <Button transparent>
              <Icon name="more" />
            </Button>
          ) : null}
        </Right>
      </Header>
    </SafeAreaView>
  );
};

export default HeaderToolBar;
