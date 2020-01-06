import React, { useState } from "react";

import { Formik } from "formik";
import * as yup from "yup";
import KPrimaryButton from "../../components/KPrimaryButton";
import { H2, View, Container } from "native-base";
import { StyleSheet } from "react-native";
import KTextInput from "../../components/KTextInput";
import CameraScreen from "../../components/Camera";

import CameraThumb from "../../components/CameraThumb";
import { addStitchAction } from "../../redux_store/actions/stitch/add-stitch.actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import KImagePicker from "../../components/ImagePicker";
import * as ImageManipulator from "expo-image-manipulator";
import { updateStitchAction } from "../../redux_store/actions/stitch/update-stitch.actions";

const AddStitch = props => {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [images, setImages] = useState([]);

  const saveOrUpdateStitch = formData => {
    if (props.selectedStitchItem) {
      console.log("UPDATE SECTION ", props.selectedStitchItem);
      props.updateStitch(props.selectedStitchItem.id, formData);
    } else {
      console.log("ADD SECTION ", props.selectedStitchItem);
      props.addStitch(formData);
    }
    props.cancelClick();
  };
  /**
   * Onsubmit button click
   */
  const onSubmitStitch = values => {
    console.log("submit clickedddddd INSIDE");
    let formData = new FormData();
    formData.append("description", values.description);
    formData.append("stype", values.stype);
    formData.append("code", values.stype.replace(/\s/g, ""));
    console.log("IMAGES ", images);
    if (images.length >= 1) {
      images.forEach( async (image, index) => {
        const result = await imageManipulate(image);
        console.log(result);
        formData.append("image" + index, {
          type: "image/jpg",
          uri: result.uri,
          name:
            values.stype + "_" + new Date().getTime() + "_" + index + ".jpg"
        });
        console.log("ENNNNNNNNNDDDD >>>> ", result);
      });
      saveOrUpdateStitch(formData);
    } else {
      saveOrUpdateStitch(formData);
    }
    console.log(images);
  };
  const imageManipulate = async (image) => {
    const imageResized = await ImageManipulator.manipulateAsync(
      image,
      [{ resize: { width: 1024 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return imageResized;
  }
  const handleImages = imgArr => {
    console.log("HANDLE IMAGE ARRAY", imgArr);
    setImages(imgArr);
  };

  return (
    <View style={styles.container}>
      <H2 style={styles.heading}>
        {props.isEditMode ? "UPDATE" : "ADD"} STITCH
      </H2>
      <Formik
        initialValues={{
          stype: props.selectedStitchItem ? props.selectedStitchItem.stype : "",
          description: props.selectedStitchItem
            ? props.selectedStitchItem.description
            : ""
        }}
        onSubmit={(values, actions) => {
          console.log("submit clickedddddd");
          onSubmitStitch(values, actions);
        }}
        validationSchema={validationSchema}
      >
        {formikProps => (
          <View style={{ flex: 1 }}>
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
            <KImagePicker
              hasImages={
                props.selectedStitchItem
                  ? props.selectedStitchItem.images
                  : null
              }
              onImageSelect={handleImages}
            ></KImagePicker> 
              {props.selectedStitchItem ? (
                <View style={styles.btn_container}>
                  <KPrimaryButton
                    title="UPDATE"
                    onPress={formikProps.handleSubmit}
                    style={styles.button}
                  />
                  <KPrimaryButton
                    title="CANCEL"
                    onPress={props.cancelClick}
                    style={[styles.button, styles.btn_red]}
                  />
                </View>
              ) : (
                <View style={styles.btn_container}>
                  <KPrimaryButton
                    title="ADD"
                    onPress={formikProps.handleSubmit}
                    style={styles.button}
                  />
                </View>
              )}
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
  console.log("MAP STATE >>>> ", stitch);
  return {
    stitch_id: stitch.stitch_id,
    update_stitch_id: stitch.update_stitch_id
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addStitch: addStitchAction,
      updateStitch: updateStitchAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStitch);
