import React, {useEffect, useState} from 'react'; 

import Animation from 'lottie-react-native';

import { Animated, Dimensions } from 'react-native';
import { Container, View, Text } from 'native-base';
const Loader = (props) => {

    const [animation, setAnimation] = useState(null);
    useEffect(() => { 
        if(animation){
          animation.play();
        }
    });

    return (
        <View style={{backgroundColor:'white', flex:1, justifyContent:'center',alignSelf:'center', 
            width: Dimensions.get('window').width, height: Dimensions.get('window').height - 180}}>
            <Animation
                ref={animation => { setAnimation(animation) }}
                style={{
                    width: 300,
                    height: 300,
                    alignSelf: 'center'
                }}
                resizeMode='cover'
                source={require('../core/lottie/spot-animation.json')}
                progress={ new Animated.Value(0)}
                />
                {/* <Text style={{position:'relative',top:10,alignSelf: 'center'}}>Loading...</Text> */}
        </View>
    )
}

export default Loader
