import React from 'react'
import { Text } from 'react-native';
import { View, Thumbnail } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const CameraThumb = (props) => {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
            <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
                {props.images.map((image) => (
                    <TouchableOpacity style={{ padding: 10, textAlign: 'right' }}>
                        <MaterialCommunityIcons name="close" size={40} color="#b2b2b2"
                            onPress={() => { props.popImage(image.uri) }}
                        ></MaterialCommunityIcons>
                        <Thumbnail large source={{ uri: image.uri }} />
                    </TouchableOpacity>
                ))}
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', paddingRight: 20 }}>
                <TouchableOpacity
                    onPress={props.cameraTriggered}>
                    <FontAwesome name="camera" size={80} color="#b2b2b2"></FontAwesome>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default CameraThumb
