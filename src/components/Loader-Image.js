import React, {useEffect, useState} from 'react'; 

import Animation from 'lottie-react-native';

import { Animated, Dimensions } from 'react-native';
import { Container, View, Text } from 'native-base';
const LoaderImage = (props) => {

    const [animation, setAnimation] = useState(null);
    useEffect(() => {
        console.log("\n\n\n\n 2nd ANIMATIONNNN >>>> ", animation);
        if(animation){
          animation.play();
        }
    });

    return (
        <View style={{backgroundColor: '#f0f0f0', flex:1, justifyContent:'center'}}>
            <Animation
                ref={animation => { setAnimation(animation) }}
                style={{
                    width: 300,
                    height: 300,
                    alignSelf: 'center'
                }}
                resizeMode='cover'
                source={require('../core/lottie/image-loader.json')}
                progress={ new Animated.Value(0)}
                />
                {/* <Text style={{position:'relative',top:10,alignSelf: 'center'}}>Loading...</Text> */}
        </View>
    )
}

export default LoaderImage
