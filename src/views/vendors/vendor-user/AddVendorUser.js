import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import KPrimaryButton from "../../../components/KPrimaryButton";
import { H2, View } from "native-base";
import KTextInput from "../../../components/KTextInput"; 
  
import { connect } from "react-redux";
import { bindActionCreators } from "redux";  
import RN_ImagePicker from "../../../components/KImagePicker";
import Geocoder from 'react-native-geocoding'; 
import TailorStyles from "./Vendor.styles.scss";

Geocoder.init("AIzaSyB5yw05RlbSDkxqDF2Chm9Ob_RU2CPMVkE");

const AddVendorUser= props => {
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
    if (props.selectedTailor) {
      console.log("UPDATE SECTION ", props.selectedTailor);
      // props.updateStitch(props.selectedTailor.id, formData);
    } else {
      // console.log("ADD SECTION ", props.selectedTailor);
      // props.addStitch(formData);
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
    stype: "",
    description: ""
  }
  return (
    <View style={TailorStyles.container}>
      <H2 style={TailorStyles.heading}>
        {props.isEditMode ? "UPDATE" : "ADD"} TAILOR
      </H2>
      <Formik initialValues={formikInitValues} onSubmit={(values, actions) => {
                  prepareFormData(values)
                  saveOrUpdateStitch(formData);
              }} validationSchema={validationSchema} >
        {formikProps => (
          <View style={{ flex: 1 }}>
            <KTextInput placeholder="Full Name" formikProps={formikProps} formikKey="stype" />
            <KTextInput placeholder="Mobile Number" formikProps={formikProps} formikKey="stype" />
            <KTextInput placeholder="Email" formikProps={formikProps} formikKey="stype" />
            <KTextInput placeholder="Password" formikProps={formikProps} formikKey="stype" />
            
            <KTextInput placeholder="Description" formikProps={formikProps} formikKey="description" /> 

            {/* <RN_ImagePicker hasImages={ props.selectedTailor ? props.selectedTailor.images : null} onImageSelect={handleImages}></RN_ImagePicker>  */}

            <View style={TailorStyles.btn_container}>
              {/* <KPrimaryButton title={props.selectedTailor ? "UPDATE" : "ADD" } onPress={formikProps.handleSubmit} style={TailorStyles.button} /> */}
              <KPrimaryButton title="NEXT" onPress={props.cancelClick} style={[TailorStyles.button, TailorStyles.btn_red]} />
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
    // stitch_id: stitch.stitch_id,
    // update_stitch_id: stitch.update_stitch_id
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      // addStitch: addStitchAction,
      // updateStitch: updateStitchAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddVendorUser);
