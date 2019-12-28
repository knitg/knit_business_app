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

const AddStitch = props => {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [images, setImages] = useState([]);
  /**
   * Handle picture after taken from camera
   */
  const handlePicture = data => {
    setImages([...images, data]);
    setCameraOpen(false);
    console.log("HANDLE PICTURE ", data, images);
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

    images.forEach((image, index) => {
      formData.append("image" + index, {
        type: "image/jpg",
        uri: image.uri,
        name: values.stitch + "_" + index + ".jpg"
      });
    });
    props.addStitch(formData);
  };
 
  return (
    <Container style={{ flex: 1 }}>
      {cameraOpen ? (
        <CameraScreen
          cameraPictureUpdate={handlePicture}
          closeCamera={() => setCameraOpen(false)}
        ></CameraScreen>
      ) : (
          <View style={styles.container}>
            <H2 style={styles.heading}>{props.isEditMode ? "UPDATE" : "ADD"} STITCH</H2>            
            <View>
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
                  <View>
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
                    <CameraThumb
                      images={images}
                      cameraTriggered={() => setCameraOpen(true)}
                      popImage={url =>
                        setImages(images.filter(obj => obj.uri !== url))
                      }
                    ></CameraThumb>
                    <View style={styles.btn_container}>
                      <KPrimaryButton title="ADD" onPress={formikProps.handleSubmit} style={styles.button} />
                      <KPrimaryButton title="CANCEL" onPress={props.cancelClick} style={[styles.button, styles.btn_red]} />
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        )}
    </Container>
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


const mapStateToProps = ({stitch}) => {
  console.log("MAP STATE >>>> ", stitch);
  return {
    stitch_id: stitch.stitch_id
  }
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addStitch: addStitchAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStitch);
