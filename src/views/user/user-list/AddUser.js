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
    .oneOf(['phone'], 'phone is requied')
    .email('Invalid email')
    .required()
    .label("Email"),
  phone: yup
    .number()
    .lessThan(10, 'length shouldnt be lessthan 10 numbers')
    .when('email', {
      is: (email) => email && email.length == 0,
      then: yup.number()
        .required('Phone number is required')
        .typeError('Phone Type field is required')
    }),
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
  const [step, setStep] = React.useState(0);

  const [userType, setUserType] = useState([]);
  useEffect(() => {
    props.getUserTypeListAction();
    return () => {
      console.log("inside return");
    };
  }, [userType]);
  
  function gotoNextStep (formikProps) {
    console.log("BEFORWE", step, formikProps.values);
    if(step == 0) {
      if(formikProps.values.user_type.length > 0){
        setStep(step + 1);
        console.log(step);
      }else{
        formikProps.setFieldTouched('user_type', true, true);
      }
    }

    
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
                  { step === 0 ? 
                  <CardCheckBox userTypeList={props.userTypeList} formikProps={formikProps} ></CardCheckBox>
                   : ( 
                     <View>
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
                      </View>
                  )}

                  <View style={styles.btn_container}>
                    {(step === 0 || step === 1)  ? 
                    <KPrimaryButton
                      title="NEXT"
                      onPress={gotoNextStep.bind(this, formikProps)}
                      style={styles.button}
                    /> : 
                    <KPrimaryButton
                      title="ADD"
                      onPress={formikProps.handleSubmit}
                      style={styles.button}
                    />
                    }
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
