import React, {useState} from 'react';
import {  Button, Icon, Fab, View, Container, Text } from 'native-base';
import { Ionicons, Octicons, AntDesign } from '@expo/vector-icons'
import { SafeAreaView, TouchableOpacity } from 'react-native';

// here, we add the spacing for iOS
// and pass the rest of the props to React Native's StatusBar

const KFab = (props) => { 
    const [active, setActive] = useState(false)
    return (  
        <Fab style={{flex: 1}}
            active={active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() =>{ setActive(!active)}}>
            <Octicons name="plus" size={32} color="green" />
            {props.children}
          </Fab> 
           
    );
}
export default KFab;