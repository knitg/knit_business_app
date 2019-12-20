import React from "react";
import { SafeAreaView } from "react-navigation";
import { Formik } from "formik";
import KTextInput from "../components/KTextInput";
import * as yup from "yup";
import KPrimaryButton from "../components/KPrimaryButton";
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
        </SafeAreaView>
    );
}

export default Login;
