import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Container,
  H2,
  Input,
  Button,
  Icon,
  Textarea
} from "native-base";

import { Formik, Field, FieldArray, useField } from "formik";
import { StyleSheet } from "react-native";
import KPrimaryButton from "../../../components/KPrimaryButton";
import * as yup from "yup";
import KTextInput from "../../../components/KTextInput";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { getUserTypeListAction } from "../../../redux_store/actions/users/crud-user-type.actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Checkbox from "react-native-modest-checkbox";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

/**
 * Validation schema
 * stitch, description validations here
 */
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .label("User Name")
    .min(2, "Seems a bit short"),
  email: yup
    .string()
    .required()
    .label("Email")
    .min(2, "Seems a bit short"),
  phone: yup
    .number()
    .required()
    .label("Phone")
    .min(2, "Seems a bit short"),
  password: yup
    .string()
    .required()
    .label("Password")
    .min(2, "Seems a bit short"),
  user_type: yup
    .array()
    .required()
    .label("User Type")
    .min(1, "Seems a bit short"),
  user_role: yup
    .array()
    .nullable()
    .label("User Role")
    .min(2, "Description should be atleast 2 characters")
});

function AddUser(props) {
  const [value, setValue] = React.useState(false);

  const [userType, setUserType] = useState([]);
  useEffect(() => {
    props.getUserTypeListAction();
    return () => {
      console.log("inside return");
    };
  }, [userType]);

  return (
    <Container style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView>
          <H2 style={styles.heading}>
            {props.isEditMode ? "UPDATE" : "ADD"} User Type
          </H2>

          <Formik
            initialValues={{
              username: "",
              email: "",
              phone: "",
              password: "",
              user_type: [],
              user_role: null,
              images: []
            }}
            onSubmit={(values, actions) => {
              console.log("submit clickedddddd", values, actions);
              // onSubmitStitch(values, actions);
            }}
            validationSchema={validationSchema}
          >
            {formikProps => {
              console.log("formikProps", formikProps);
              return (
                <View style={styles.container}>
                  {/* <CheckBox checked={formikProps.values.} color="green"/> */}
                  {props.userTypeList && props.userTypeList.length > 0
                    ? props.userTypeList.map((usertype, index) => (
                        <Checkbox
                          key={index}
                          containerStyle={{ marginHorizontal: 30 }}
                          labelStyle={{ padding: 10 }}
                          checked={formikProps.values.user_type.includes(
                            usertype
                          )}
                          checkedComponent={
                            <MaterialCommunityIcons
                              name="check-all"
                              size={50}
                              color="green"
                            />
                          }
                          uncheckedComponent={
                            <MaterialCommunityIcons
                              name="checkbox-blank-outline"
                              size={50}
                              color={formikProps.errors["user_type"] ? '#FF0000' : '#0564A4'}
                            />
                          }
                          onChange={checked => {
                            const selectedUserTypes =
                              formikProps.values.user_type;
                            if (selectedUserTypes.includes(usertype)) {
                              selectedUserTypes.splice(
                                selectedUserTypes.indexOf(usertype),
                                1
                              );
                            } else {
                              selectedUserTypes.push(usertype);
                            }
                            formikProps.setFieldValue(
                              "user_type",
                              selectedUserTypes
                            );
                          }}
                          label={usertype.user_type}
                        />
                      ))
                    : null}
                  {formikProps.touched["user_type"] &&
                  formikProps.errors["user_type"] ? (
                    <Text style={{ color: "red" }}>
                      {formikProps.touched["user_type"] &&
                        formikProps.errors["user_type"]}
                    </Text>
                  ) : null}

                  <KTextInput
                    placeholder="Username"
                    formikProps={formikProps}
                    formikKey="username"
                  />
                  <KTextInput
                    placeholder="Email"
                    formikProps={formikProps}
                    formikKey="email"
                  />
                  <KTextInput
                    placeholder="Phone"
                    formikProps={formikProps}
                    formikKey="phone"
                  />
                  <KTextInput
                    placeholder="Password"
                    formikProps={formikProps}
                    formikKey="password"
                  />
                  <Textarea
                    rowSpan={5}
                    bordered
                    placeholder="Textarea"
                    onChangeText={formikProps.handleChange("description")}
                    onBlur={formikProps.handleBlur("description")}
                    value={formikProps.values.description}
                  />
                  <View style={styles.btn_container}>
                    <KPrimaryButton
                      title="ADD"
                      onPress={formikProps.handleSubmit}
                      style={styles.button}
                    />
                    <KPrimaryButton
                      title="CANCEL"
                      onPress={props.cancelClick}
                      style={[styles.button, styles.btn_red]}
                    />
                  </View>
                </View>
              );
            }}
          </Formik>
        </ScrollView>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    fontFamily: "Roboto_medium"
  },
  heading: {
    width: "100%",
    alignItems: "center",
    padding: 20
  },
  btn_container: {
    flexDirection: "row",
    padding: 5
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 20,
    marginTop: 10
  },
  btn_red: {
    backgroundColor: "red"
  }
});

const mapStateToProps = ({ userType }) => {
  console.log("MAP STATE PROP ", userType);
  return {
    userTypeList: userType.usertypeList,
    loading: userType.loading
    // delete_user_type_id: state
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getUserTypeListAction: getUserTypeListAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
