import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

// here, we add the spacing for iOS
// and pass the rest of the props to React Native's StatusBar

export default function (props) {
    const height = (Platform.OS === 'ios') ? 20 : 30;
    const { backgroundColor } = props;

    return (
        <TouchableHighlight style={{ height, backgroundColor }}>
            <StatusBar { ...props } />
        </TouchableHighlight>
    );
}