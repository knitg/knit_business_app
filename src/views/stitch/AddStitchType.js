import React, { useState, useEffect } from "react";

import { Formik } from "formik";
import * as yup from "yup";
import KPrimaryButton from "../../components/KPrimaryButton";
import { H2, View, Picker, Container } from "native-base";
import { StyleSheet, Text, ScrollView } from "react-native";
import KTextInput from "../../components/KTextInput";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import KImagePicker from "../../components/ImagePicker";
import { addStitchTypeAction } from "../../redux_store/actions/stitch/add-stitch-type.action";
import * as ImageManipulator from "expo-image-manipulator";


const AddStitchType = props => {
  const [images, setImages] = useState([]);
  const [stitch, setStitch] = useState([]);

  useEffect(() => {
    console.log("INSID EUSE EFFFF", props.stitchList)
  }, []);

  const saveOrUpdateStitchType = formData => {
    if (props.selectedStitchItem) {
      console.log("UPDATE SECTION ", props.selectedStitchItem);
      // props.updateStitch(props.selectedStitchItem.id, formData);
    } else {
      console.log("ADD SECTION ", props.selectedStitchItem);
      props.addStitchTypeSubmit(formData);
    }
    props.cancelClick();
  };
  /**
   * Onsubmit button click
   */
  const onSubmitStitch = values => {
    console.log("submit clickedddddd INSIDE", values, stitch);

    let formData = new FormData();
    formData.append("description", values.description);
    formData.append("stype", values.stype);
    formData.append("code", values.stype.replace(/\s/g, ""));
    formData.append("stitch", stitch);
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
     
    saveOrUpdateStitchType(formData)
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
             
            <ScrollView>
              <View >
              <Picker
                  mode="dropdown"
                  style={{ height:100, margin:5, }}
                  selectedValue={stitch}
                  onValueChange={(val) => setStitch(val)}
                >
                  {props.stitchList.length >= 1 && props.stitchList.map((stitch, i) => {
                    return <Picker.Item key={i} label={stitch.stype} value={stitch.id}
                    itemStyle={{ backgroundColor: "grey", color: "blue", fontSize:17, borderColor:'green', borderStyle:'solid', borderWidth:3 }}
                   />
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
                <View style={{height:images.length >=1 ? 300 : 100  }}>
                    <KImagePicker onImageSelect={handleImages}></KImagePicker>
                </View>
                </View>
            </ScrollView>
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
    stitch_type_id: stitch.stitch_type_id
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addStitchTypeSubmit: addStitchTypeAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStitchType);
