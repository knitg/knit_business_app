import React, {useState} from 'react';
import {  Button, Icon, Fab, View, Container, Text } from 'native-base';
import { SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';

import ActionButton from 'react-native-action-button';

// here, we add the spacing for iOS
// and pass the rest of the props to React Native's StatusBar

/** USAGE
 * <KFabAction>
      <ActionButton.Item buttonColor='#9b59b6' title="New Stitch" onPress={() => console.log("notes tapped!")}>
          <AntDesign name="customerservice" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </KFabAction> 
 */

const KFabAction = (props) => { 
    const [active, setActive] = useState(false)
    return (  
      <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
      {/* Rest of the app comes ABOVE the action button component !*/}
      <ActionButton buttonColor="rgba(231,76,60,1)">
        {props.children}
      </ActionButton>
    </View>
           
    );
}
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
export default KFabAction;