import React from "react";
import { View, Text, CardItem, Icon, Right, Card } from "native-base";
import { TouchableHighlight } from "react-native-gesture-handler";

import {
  FontAwesome
} from "@expo/vector-icons";

const UserTypeList = (props) => {

  return (
    <View name="userlist">
      {props.users && props.users.length > 0 ? (
        <Card>
          {props.users && props.users.map((user, index) => {
            return (
              <CardItem style={{}} key={index}>
                <FontAwesome active name="user-circle-o" size={45} />
                <Text style={{ padding: 25 }}>{user.username}</Text>
                <Right style={{ flex: 1 }}>
                  <TouchableHighlight style={{ padding: 20 }} onPress={() => props.clickedItem(user)}>
                    <Icon name="arrow-forward" />
                  </TouchableHighlight>
                </Right>
              </CardItem>
            )
          })
          }
        </Card>) : <Text>No records found!</Text>}
    </View>
  );
}
export default UserTypeList; 