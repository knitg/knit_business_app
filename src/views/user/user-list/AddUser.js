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

import { Formik } from "formik";
import { StyleSheet } from "react-native";
import KPrimaryButton from "../../../components/KPrimaryButton";
import * as yup from "yup";
import KTextInput from "../../../components/KTextInput";
import { ScrollView } from "react-native-gesture-handler";
import { getUserTypeListAction } from "../../../redux_store/actions/users/crud-user-type.actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { CardCheckBox } from "../../../components/CardCheckBox";
import { addUserAction, updateUserAction } from "../../../redux_store/actions/users/crud-user.actions";

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
  phone: yup
    .number()
    .required()
    .label("Email")
    .min(10, "Seems a bit short"),
  email: yup
    .string() 
    .email('Invalid email')
    .when('phone', {
      is: (phone) => phone && phone.length == 0,
      then: yup.string().email()
        .required('Email is required')
        .typeError('Email is required')
    }),
  password: yup
    .string()
    .required()
    .label("Password")
    .min(2, "Seems a bit short"),
  user_type: yup
    .array()
    .default([])
    .notRequired()
    .label("User Type"),
  user_role: yup
    .array()
    .nullable()
    .label("User Role")
    .min(2, "Description should be atleast 2 characters")
});

function AddUser(props) {
  const [step, setStep] = React.useState(0);

  const [userType, setUserType] = useState(null);

  /**
   * Prepare Form Data here..
   */
  const prepareFormData = values => {
    let formData = new FormData();
    const userTypeArr  = values.user_type.map((val, i) => val.id);
    console.log("userTypeArr >>> ", userTypeArr );
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("password", values.password);
    formData.append("user_type", userTypeArr.toString());
    formData.append("user_role", values.user_role);
    return formData;
  };
  /**
   * Save Or Update action triggers
   * @param {*} formData - formData
   */
  const saveOrUpdateUser = async (formData) => {
    let actionDone;
    if (props.selectedUser) {
      console.log("UPDATE SECTION ", props.selectedUser);
      actionDone = await props.updateUserAction(props.selectedUser.id, formData);
    } else {
      console.log("ADD SECTION ", formData);
      actionDone = await props.addUserAction(formData);
      console.log("ACTION DONE 2", actionDone);
    }
    console.log("ACTION DONE 3", actionDone);
    if(props.user_id){
      props.cancelClick();
    }
  };

  function gotoNextStep (formikProps) {
    formikProps.handleSubmit();
    if(step == 0) {
      const keys = Object.keys(formikProps.errors);
      console.log("KEYYYYYYYSSSSS" , keys);
      if(keys.length > 0){
        setStep(step + 1);
        console.log(step);
      }else{
        // formikProps.setFieldTouched('user_type', true, true);
      }
    }
  }
  const errorObjects = (obj) => {
    const errors = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          console.log(key, obj[key]);
          errors.push(<Text>{obj[key]}</Text>);
        }
    }
    return errors;
  }
  return (
    <Container style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView>
          <H2 style={styles.heading}>
            {props.isEditMode ? "UPDATE" : "ADD"} User
          </H2>

          <Formik
            initialValues={{
              username: props.selectedUser ? props.selectedUser.username : "",
              phone: props.selectedUser ? props.selectedUser.phone : "",
              email: props.selectedUser ? props.selectedUser.email : "",
              password: props.selectedUser ? props.selectedUser.password : "",
              user_type: [],
              user_role: 'ADMIN',
              images: []
            }}
            onSubmit={(values, actions, errors) => {
              console.log("submit clickedddddd >>> ", values, actions, errors);
              const formData = prepareFormData(values);
              saveOrUpdateUser(formData);
            }}
            validationSchema={validationSchema}
          >
            {formikProps => {
              console.log("formikProps", formikProps);
              return (
                <View style={styles.container}> 
                  { step === 0 ? ( 
                     <View>
                        <KTextInput
                          placeholder="Username"
                          formikProps={formikProps}
                          formikKey="username"
                        />
                        <KTextInput
                          placeholder="Phone"
                          formikProps={formikProps}
                          formikKey="phone"
                        />
                        <KTextInput
                          placeholder="Email"
                          formikProps={formikProps}
                          formikKey="email"
                        />
                        {!(props.selectedUser && props.selectedUser.password) ? (<KTextInput
                          placeholder="Password"
                          formikProps={formikProps}
                          formikKey="password"
                        />) : null}
                        <Textarea
                          rowSpan={5}
                          bordered
                          placeholder="Textarea"
                          onChangeText={formikProps.handleChange("description")}
                          onBlur={formikProps.handleBlur("description")}
                          value={formikProps.values.description}
                        />
                      </View>
                  ) : 
                  (<CardCheckBox userTypeList={props.userTypeList} formikProps={formikProps} ></CardCheckBox>)                  
                  }

                  <View style={styles.btn_container}>
                  <KPrimaryButton title={props.selectedUser ? "UPDATE" : "ADD" } 
                      onPress={formikProps.handleSubmit} 
                      style={styles.button} 

                      />
               
                    {/* {(step === 0)  ? 
                    <KPrimaryButton
                      title="NEXT"
                      onPress={gotoNextStep.bind(this, formikProps)}
                      style={styles.button}
                    /> : 
                    <KPrimaryButton
                      title={props.selectedUser ? "UPDATE" : "ADD"}
                      onPress={formikProps.handleSubmit}
                      style={styles.button}
                    />
                    } */}
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

const mapStateToProps = ({ user }) => {
  console.log("MAP STATE PROP ", user);
  return {
    user_id: user
    // delete_user_type_id: state
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addUserAction: addUserAction,
      updateUserAction: updateUserAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
