import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import KPrimaryButton from "../../components/KPrimaryButton";
import { H2, Picker, View, Container } from "native-base";
import KTextInput from "../../components/KTextInput"; 
 
import { connect } from "react-redux";
import { bindActionCreators } from "redux";  
import RN_ImagePicker from "../../components/KImagePicker";

import StitchStyles from "./Stitch.styles.scss";
import { addStitchTypeAction, updateStitchTypeAction } from "../../redux_store/actions/stitch/crud-stitch-type.action.js";

const AddStitchType = props => {
  const [images, setImages] = useState([]);  
  const [stitch, setStitch] = useState([]);

  let formData = new FormData();
  /**
   * Save Or Update action triggers
   * @param {*} formData - formData
   */
  const saveOrUpdateStitch = formData => {
    if (props.selectedStitchItem) {
      console.log("UPDATE SECTION ", props.selectedStitchItem);
      props.updateStitchTypeAction(props.selectedStitchItem.id, formData);
    } else {
      console.log("ADD SECTION ", props.selectedStitchItem);
      props.addStitchTypeAction(formData);
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
    formData.append("stitch", stitch);
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
  /** Handle images */ 
  const handleImages = imgArr => {
    console.log("HANDLE IMAGE ARRAY", imgArr);
    setImages(imgArr);
  };
  const formikInitValues = {
    stitch: props.stitch ? props.selectedStitchItem.stitch : "",
    stype: props.selectedStitchItem ? props.selectedStitchItem.stype : "",
    description: props.selectedStitchItem ? props.selectedStitchItem.description : ""
  }
  return (
    <Container style={StitchStyles.container}>
      <H2 style={StitchStyles.heading}>
        {props.isEditMode ? "UPDATE" : "ADD"} STITCH
      </H2>
      <Formik initialValues={formikInitValues} onSubmit={(values, actions) => 
              {
                  prepareFormData(values)
                  saveOrUpdateStitch(formData);
              }} 
        validationSchema={validationSchema}>
        {formikProps => (
          <View style={{flex: 1}}>
            <Picker mode="dropdown" style={{flex:1, margin:5 }} selectedValue={stitch} onValueChange={(val) => setStitch(val)}>
                {props.stitchList.length >= 1 && props.stitchList.map((stitch, i) => {
                  return <Picker.Item key={i} label={stitch.stype} value={stitch.id}
                  itemStyle={{ backgroundColor: "grey", color: "blue", fontSize:17, borderColor:'green', borderStyle:'solid', borderWidth:3 }}
                  />
                })}
            </Picker>
            <KTextInput placeholder="Stitch" formikProps={formikProps} formikKey="stype" />
            <KTextInput placeholder="Description" formikProps={formikProps} formikKey="description" />
            
            <RN_ImagePicker hasImages={ props.selectedStitchItem ? props.selectedStitchItem.images : null} onImageSelect={handleImages}></RN_ImagePicker> 

            <View style={StitchStyles.btn_container}>
              <KPrimaryButton title={props.selectedStitchItem ? "UPDATE" : "ADD" } onPress={formikProps.handleSubmit} style={StitchStyles.button} />
              <KPrimaryButton title="CANCEL" onPress={props.cancelClick} style={[StitchStyles.button, StitchStyles.btn_red]} />
            </View>
          </View> 
        )}
      </Formik>
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

const mapStateToProps = ({ stitch }) => {
  return {
    stitchList : stitch.stitchlist,
    stitch_id: stitch.stitch_id,
    update_stitch_id: stitch.update_stitch_id
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addStitchTypeAction: addStitchTypeAction,
      updateStitchTypeAction: updateStitchTypeAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStitchType);
