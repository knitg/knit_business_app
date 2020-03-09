import React from "react";
import { View, Text, Container, H2 } from "native-base";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik } from "formik";
import { StyleSheet } from "react-native";
import KPrimaryButton from "../../../components/KPrimaryButton";
import * as yup from "yup";
import KTextInput from "../../../components/KTextInput";
import { addUserTypeAction, updateUserTypeAction } from "../../../redux_store/actions/users/crud-user-type.actions";
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
        .max(50, "Length shouldn't be greater than 50 chars"),
    description: yup
        .string()
        .required()
        .label("Description")
        .min(2, "Description should be atleast 2 characters")
});

function AddUserType(props) {


    const onUpdateValue = (val) => {
        console.log("UPDATED VAL", val);
    }

    let formData = new FormData();
    /**
     * Prepare Form Data here..
     */
    const prepareFormData = (values) => {
            formData.append("description", values.description);
            formData.append("user_type", values.user_type);
        }
        /**
         * Save Or Update action triggers
         * @param {*} formData - formData
         */
    const saveOrUpdateUserType = formData => {
        if (props.selectedStitchItem) {
            console.log("UPDATE SECTION ", props.selectedStitchItem);
            props.updateUserTypeAction(props.selectedStitchItem.id, formData);
        } else {
            console.log("ADD SECTION ", props.selectedStitchItem);
            props.addUserTypeAction(formData);
        }
        props.cancelClick();
    };


    return ( <
        Container style = {
            { flex: 1 } } >
        <
        View style = { styles.container } >
        <
        H2 style = { styles.heading } > { props.isEditMode ? "UPDATE" : "ADD" }
        User Type < /H2>             <
        Formik initialValues = {
            {
                user_type: props.selectedUserType ? props.selectedUserType.user_type : "",
                description: props.selectedUserType ? props.selectedUserType.description : ""
            }
        }
        onSubmit = {
            (values, actions) => {
                console.log("submit clickedddddd", values, actions);
                prepareFormData(values)
                saveOrUpdateUserType(formData);
            }
        }
        validationSchema = { validationSchema } >
        {
            formikProps => ( <
                View >
                <
                KTextInput placeholder = "User Type"
                formikProps = { formikProps }
                formikKey = "user_type"
                onUpdateValue = { onUpdateValue }
                /> <
                KTextInput placeholder = "Description"
                formikProps = { formikProps }
                formikKey = "description" /
                >
                <
                View style = { styles.btn_container } >
                <
                KPrimaryButton title = "ADD"
                onPress = { formikProps.handleSubmit }
                style = { styles.button }
                /> <
                KPrimaryButton title = "CANCEL"
                onPress = { props.cancelClick }
                style = {
                    [styles.button, styles.btn_red] }
                /> <
                /View> <
                /View>
            )
        } <
        /Formik> <
        /View> <
        /Container>
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

const mapStateToProps = ({ user }) => {
    console.log(user);
    return {
        user_id: user.user_id,
        update_user_id: user.update_user_id
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
            addUserTypeAction: addUserTypeAction,
            updateUserTypeAction: updateUserTypeAction
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserType);