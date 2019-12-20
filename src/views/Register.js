import React from 'react';
import { View, Text, Button } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Register(props) {
    
    const { navigate } = props.navigation;
    console.log(navigate);
    return (
        <View>
            <Text>FROM Register </Text>
            <TouchableOpacity>
               
            <Text>If you already registered? </Text> 
            <Button info onPress={() => props.navigation.navigate({ routeName: 'Login' }) }>
                <Text> Login</Text>
            </Button>
            </TouchableOpacity>
        </View>
    );
}

export default Register;