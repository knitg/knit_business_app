import React from 'react';
import { View, Text, Button } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Login(props) {

    const { navigate } = props.navigation;
    console.log(navigate);
    return (
        <View>
            <Text>FROM Login </Text>

            <TouchableOpacity>
                <Text>Aren't you registered? </Text>

                <Button warning onPress={() => props.navigation.navigate({ routeName: 'Register' })}>
                    <Text> Signup</Text></Button>

                <Button info onPress={() => props.navigation.navigate({ routeName: 'Dashboard' })}>
                    <Text> Go to Dashboard</Text>
                </Button>


            </TouchableOpacity>
        </View>
    );
}

export default Login;