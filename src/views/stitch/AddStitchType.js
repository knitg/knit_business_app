import React, { useState, useEffect } from "react";

import { Formik } from "formik";
import * as yup from "yup";
import KPrimaryButton from "../../components/KPrimaryButton";
import { H2, View, Picker } from "native-base";
import { StyleSheet, Text } from "react-native";
import KTextInput from "../../components/KTextInput";
import { addStitchAction } from "../../redux_store/actions/stitch/add-stitch.actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import KImagePicker from "../../components/ImagePicker";

const AddStitchType = props => {
  const [images, setImages] = useState([]);
  const [stitch, setStitch] = useState([]);

  useEffect(() => {
    console.log("INSID EUSE EFFFF", props.stitchList)
  }, []);
  /**
   * Onsubmit button click
   */
  const onSubmitStitch = values => {
    console.log("submit clickedddddd INSIDE");

    let formData = new FormData();
    formData.append("description", values.description);
    formData.append("stype", values.stype);
    formData.append("code", values.stype.replace(/\s/g, ""));

    images.forEach((image, index) => {
      formData.append("image" + index, {
        type: "image/jpg",
        uri: image.uri,
        name: values.stitch + "_" + index + ".jpg"
      });
    });
    console.log(images);
    // props.addStitch(formData);
  };

  const handleImages = imgArr => {
    console.log("HANDLE IMAGE ARRAY", imgArr);
    setImages(imgArr);
  };

  return (
    <View style={styles.container}>
      <H2 style={styles.heading}>
        {props.isEditMode ? "UPDATE" : "ADD"} STITCH TYPE
      </H2>
      <Formik
        initialValues={{
          stype: "",
          description: ""
        }}
        onSubmit={(values, actions) => {
          console.log("submit clickedddddd");
          onSubmitStitch(values, actions);
        }}
        validationSchema={validationSchema}
      >
        {formikProps => (
          <View style={{ flex: 1 }}>
            <Picker
              note
              mode="dropdown"
              style={{ flex: 1, padding:5, marginHorizontal:10, marginVertical:0, borderWidth:1, borderColor:'red', borderStyle:'solid' }}
              selectedValue={stitch}
              onValueChange={(val) => setStitch(val)}
            >
              {props.stitchList.length >= 1 && props.stitchList.map((stitch, i) => {
                return <Picker.Item key={i} label={stitch.stype} value={stitch.code} />
              })}
            </Picker>
            <KTextInput
              placeholder="Stitch"
              formikProps={formikProps}
              formikKey="stype"
            />
            <KTextInput
              placeholder="Description"
              formikProps={formikProps}
              formikKey="description"
            />
            <KImagePicker onImageSelect={handleImages}></KImagePicker>
            <View style={styles.btn_container}>
              <KPrimaryButton
                title="ADD"
                onPress={formikProps.handleSubmit}
                style={styles.button}
              />
              {/* <KPrimaryButton title="CANCEL" onPress={props.cancelClick} style={[styles.button, styles.btn_red]} /> */}
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

/**
 * Validation schema
 * stitch, description validations here
 */
const validationSchema = yup.object().shape({
  stype: yup
    .string()
    .required()
    .label("Stitch")
    .min(2, "Seems a bit short")
    .max(10, "We prefer insecure system"),
  description: yup
    .string()
    .required()
    .label("Description")
    .min(2, "Description should be atleast 2 characters")
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

const mapStateToProps = ({ stitch }) => {
  console.log("ADD STITCH >>> <<<< MAP STATE >>>> ", stitch);
  return {    
    stitchList : stitch.stitchlist,
    stitch_id: stitch.stitch_id
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addStitch: addStitchAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStitchType);
