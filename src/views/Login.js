import React from "react";
import { SafeAreaView } from "react-navigation";
import { Formik } from "formik";
import KTextInput from "../components/KTextInput";
import * as yup from "yup";
import KPrimaryButton from "../components/KPrimaryButton";
import { H2, View, H3, Text, Button, ListItem, CheckBox, Body } from "native-base";
import { Image, StyleSheet,TouchableOpacity  } from 'react-native';
/**
 * Validation schema
 * url, username, password validations here
 */
const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required()
        .label("Username")
        .min(2, "Seems a bit short")
        .max(10, "We prefer insecure system"),
    phone: yup
        .string()
        .required()
        .label("Phone Number")
        .min(9, "Phone number should be atleast 10 characters"),
    password: yup
        .string()
        .required()
        .label("Password")
        .min(2, "Seems a bit short")
        .max(10, "We prefer insecure system")
});


const Login = (props) => {
    const { navigate } = props.navigation;
    console.log(navigate);
    return (
        <SafeAreaView style={{ marginTop: 50 }}>
            <View style={styles.container}>
                <View style={styles.redbox} >
                    {/* <Image source={require('../assets/images/logo.jpg')} style={{ width: 180, height: 180 }} /> */}
                    
                </View>
                <View style={styles.formbox} >
                    <Formik
                        initialValues={{
                            phone: "0000000000",
                            username: "admin",
                            password: "admin"
                        }}
                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                                props.navigation.navigate({ routeName: 'Stitch' })
                            }, 1000);
                        }}
                        validationSchema={validationSchema}
                    >
                        {formikProps => (
                            <React.Fragment> 
                                <KTextInput
                                    placeholder="Email/Phone number"
                                    formikProps={formikProps}
                                    formikKey="username"
                                />
                                <KTextInput
                                    placeholder="Password"
                                    formikProps={formikProps}
                                    formikKey="password"
                                />
                                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                                    <Text style={{padding:15, fontSize:15}}>If yourn't Registered, </Text>
                                    <Button onPress={() => navigate({ routeName: 'Register' })}>
                                        <Text>Signup</Text>
                                    </Button>
                                    <Text style={{padding:15}}>here</Text>
                                </View>
                                    
                                <KPrimaryButton
                                    title="Login"
                                    onPress={formikProps.handleSubmit}
                                    style={{
                                        marginHorizontal: 15,
                                        paddingVertical: 30,
                                        marginTop: 20 
                                    }}
                                    textStyle={
                                        {
                                            /* styles for button title */
                                        }
                                    }
                                />
                            </React.Fragment>
                        )}
                    </Formik>
                </View>
            </View>


        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        width:'100%',
        flexDirection: 'column',
        justifyContent: 'center',
        fontFamily:'Roboto_medium'
    },
    redbox: {
        width:'100%',
        alignItems: 'center',
    },
    formbox: {
        width:'100%'
    },
})
export default Login;
