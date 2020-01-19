import React from "react";
import { View, Text, Container, H2 } from "native-base";

import { Formik } from "formik"; 
import { StyleSheet } from "react-native";
import KPrimaryButton from "../../../components/KPrimaryButton";
import * as yup from "yup";
import KTextInput from "../../../components/KTextInput";
/**
 * Validation schema
 * stitch, description validations here
 */
const validationSchema = yup.object().shape({
  user_type: yup
    .string()
    .required()
    .label("User Type")
    .min(2, "Seems a bit short")
    .max(10, "We prefer insecure system"),
  description: yup
    .string()
    .required()
    .label("Description")
    .min(2, "Description should be atleast 2 characters")
});

function AddUserType(props) {
  return (
    <Container style={{ flex: 1 }}>
        <View style={styles.container}>
            <H2 style={styles.heading}>{props.isEditMode ? "UPDATE" : "ADD"} User Type</H2>            
              <Formik
                initialValues={{
                  user_type: "",
                  description: ""
                }}
                onSubmit={(values, actions) => {
                  console.log("submit clickedddddd");
                  onSubmitStitch(values, actions);
                }}
                validationSchema={validationSchema}
              >
                {formikProps => (
                  <View>
                    <KTextInput
                      placeholder="User Type"
                      formikProps={formikProps}
                      formikKey="user_type"
                    />
                    <KTextInput
                      placeholder="Description"
                      formikProps={formikProps}
                      formikKey="description"
                    />
                    <View style={styles.btn_container}>
                      <KPrimaryButton title="ADD" onPress={formikProps.handleSubmit} style={styles.button} />
                      <KPrimaryButton title="CANCEL" onPress={props.cancelClick} style={[styles.button, styles.btn_red]} />
                    </View>
                  </View>
                )}
              </Formik>
            </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    fontFamily: "Roboto_medium"
  },
  heading: {
    width: "100%",
    alignItems: "center",
    padding: 20
  }, 
  btn_container: {
    flexDirection: 'row',
    padding: 5
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 20,
    marginTop: 10,
  },
  btn_red: {
    backgroundColor: 'red'
  }
});

export default AddUserType;
