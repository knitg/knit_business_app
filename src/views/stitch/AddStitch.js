import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import KPrimaryButton from "../../components/KPrimaryButton";
import { H2, View } from "native-base";
import KTextInput from "../../components/KTextInput"; 
 
import { addStitchAction, updateStitchAction } from "../../redux_store/actions/stitch/crud-stitch.actions";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";  
import RN_ImagePicker from "../../components/KImagePicker";
import Geocoder from 'react-native-geocoding';
import StitchStyles from "./Stitch.styles.scss";
import { PROVIDER_GOOGLE } from "react-native-maps"; 
import FitToCoordinates from "../../components/KMaps";

Geocoder.init("AIzaSyB5yw05RlbSDkxqDF2Chm9Ob_RU2CPMVkE");
const AddStitch = props => {
  const createMarker = (lat=this.state.position.latitude,  lng= this.state.position.longitude) => {
    return {
      latitude: lat | 0,
      longitude: lng | 0
    };
  }
  const markers = [
      createMarker(17.48, 78.41),
      createMarker(17.14 , 77.04),
      createMarker(17.85, 76.10),
      createMarker(17.14 , 75.04),
  ];
  const [images, setImages] = useState([]); 
  useEffect(() => {
    console.log("use effect ", props);
  }, []);

  let formData = new FormData();
  /**
   * Save Or Update action triggers
   * @param {*} formData - formData
   */
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
   * Prepare Form Data here..
   */
  const prepareFormData = (values) => {
    formData.append("description", values.description);
    formData.append("stype", values.stype);
    formData.append("code", values.stype.replace(/\s/g, ""));
    if (images.length >= 1) {
      images.forEach( async (image, index) => { 
        formData.append("image" + index, {
          type: "image/jpg",
          uri: image, 
          name: values.stype + "_" + new Date().getTime() + "_" + index + ".jpg"
        }); 
      });
    }
  }
  /**
   * On submit form click here..
   * @param {*} values 
   */
  const onSubmitStitch = values => {
    console.log("submit clickedddddd INSIDE");
    prepareFormData(values)
    saveOrUpdateStitch(formData);
    console.log(images);
  };
  const onUpdateValue = (val) => {
        console.log("UPDATED VAL", val);
        // Geocoder.from(val)
        // .then(json => {
        //   console.log(json);
        //   var location = json.results[0].geometry.location;
        //   console.log(location);
        // })
        // .catch(error => console.warn(error));
  }
  const handleImages = imgArr => {
    console.log("HANDLE IMAGE ARRAY", imgArr);
    setImages(imgArr);
  };
  const formikInitValues = {
    stype: props.selectedStitchItem ? props.selectedStitchItem.stype : "",
    description: props.selectedStitchItem ? props.selectedStitchItem.description : ""
  }
  return (
    <View style={StitchStyles.container}>
      <H2 style={StitchStyles.heading}>
        {props.isEditMode ? "UPDATE" : "ADD"} STITCH
      </H2>
      <Formik initialValues={formikInitValues} onSubmit={(values, actions) => {
                  prepareFormData(values)
                  saveOrUpdateStitch(formData);
              }} validationSchema={validationSchema} >
        {formikProps => (
          <View style={{ flex: 1 }}>
            <KTextInput placeholder="Stitch" formikProps={formikProps} formikKey="stype" onUpdateValue={onUpdateValue} />
            <KTextInput placeholder="Description" formikProps={formikProps} formikKey="description" /> 
            <RN_ImagePicker hasImages={ props.selectedStitchItem ? props.selectedStitchItem.images : null} onImageSelect={handleImages}></RN_ImagePicker> 

            {/* <FitToCoordinates provider={PROVIDER_GOOGLE} markers= {markers}></FitToCoordinates> */}
            <View style={StitchStyles.btn_container}>
              <KPrimaryButton title={props.selectedStitchItem ? "UPDATE" : "ADD" } onPress={formikProps.handleSubmit} style={StitchStyles.button} />
              <KPrimaryButton title="CANCEL" onPress={props.cancelClick} style={[StitchStyles.button, StitchStyles.btn_red]} />
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

const mapStateToProps = ({ stitch }) => {
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
