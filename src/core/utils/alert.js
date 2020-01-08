import React, { useState } from 'react';
import { Alert } from 'react-native';

// here, we add the spacing for iOS
// and pass the rest of the props to React Native's StatusBar

const KAlert = (props) => {
    return (
        // Works on both Android and iOS
        Alert.alert(
            props.title,
            props.message,
            [
                {text: 'OK', onPress: props.okCallback},
            ],
            {cancelable: false},
        )
    );
}
export default KAlert;

export const alert = (title, message) => {
    // Works on both Android and iOS
    Alert.alert(
        title,
        message,
        [
            {text: 'OK', onPress: () => {console.log("ok clicked")}},
        ],
        {cancelable: false},
    )
}