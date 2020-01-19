import React from "react";
import {
  View,
  Text,
  CardItem,
  Icon,
  Right,
  Card,
  Header,
  Left,
  Button
} from "native-base";
import { TouchableHighlight } from "react-native-gesture-handler";
 

const UserDetail = props => {
  return (
    <View name="userlist">
      <Header transparent>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={props.backButtonPressed}>
            <Icon name="arrow-back" style={{ fontSize: 30, color: "red" }} />
          </Button>
        </Left>
      </Header>
      {props.user ? (
        <View style={{ padding: 20 }}>
          <Text>Email: {props.user.email}</Text>
          <Text>Phone Number: {props.user.phone}</Text>
          <Text>Username: {props.user.username}</Text>
          <Text>UserRole: {props.user.user_role}</Text>
          <Text>
            UserType: {props.user.user_type && props.user.user_type[0]}
          </Text>
        </View>
      ) : null}
    </View>
  );
};
export default UserDetail;
