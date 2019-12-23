import React, {useReducer} from "react";
import { SafeAreaView } from "react-navigation";
import { Formik } from "formik";
import KTextInput from "../components/KTextInput";
import * as yup from "yup";
import KPrimaryButton from "../components/KPrimaryButton";
import { H2, View, H3, ListItem, CheckBox, Body, Text } from "native-base";
import { Image, StyleSheet } from 'react-native';
/**
 * Validation schema
 * url, username, password validations here
 */
const validationSchema = yup.object().shape({
    email: yup
        .string()
        .required()
        .label("Email")
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


const Register = (props) => {
    const { navigate } = props.navigation;
    const userTypes = [{ id: 1, type: "Tailor" }, { id: 1, type: "Boutique" }, { id: 1, type: "Master" }, { id: 1, type: "Designer" }]

    console.log(navigate);
    return (
        <SafeAreaView style={{ marginTop: 50 }}>
            <View style={styles.container}>
                <View style={styles.redbox} >
                    <Image source={require('../assets/images/logo.jpg')} style={{ width: 180, height: 180 }} />
                    <H2>Create an account</H2>
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
                                props.navigation.navigate({ routeName: 'Dashboard' })
                            }, 1000);
                        }}
                        validationSchema={validationSchema}
                    >
                        {formikProps => (
                            <React.Fragment>
                                <Text> Do you want to register as?</Text>
                                {userTypes.map(element => {
                                    return (
                                        <ListItem>
                                        <CheckBox checked={false} color="green"/>
                                            <Body>
                                                <Text>{element.type}</Text>
                                            </Body>
                                        </ListItem>
                                    )
                                })}
                                
                                <KTextInput
                                    placeholder="Phone Number"
                                    formikProps={formikProps}
                                    formikKey="phone"
                                />
                                <KTextInput
                                    placeholder="User Name"
                                    formikProps={formikProps}
                                    formikKey="username"
                                />
                                <KTextInput
                                    placeholder="Password"
                                    formikProps={formikProps}
                                    formikKey="password"
                                />

                                <KPrimaryButton
                                    title="Signup"
                                    onPress={formikProps.handleSubmit}
                                    style={{
                                        marginHorizontal: 15,
                                        paddingVertical: 30,
                                        marginTop: 20
                                    }}
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
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        fontFamily: 'Roboto_medium'
    },
    redbox: {
        width: '100%',
        alignItems: 'center',
    },
    formbox: {
        width: '100%'
    },
})
export default Register;
