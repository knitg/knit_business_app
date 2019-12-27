import React, { useReducer, useState } from "react";
import { SafeAreaView } from "react-navigation";

import { Formik } from "formik";
import * as yup from "yup";
import KPrimaryButton from "../../components/KPrimaryButton";
import { H2, View, H3, ListItem, CheckBox, Body, Text, Container, Thumbnail, Content } from "native-base";
import { Image, StyleSheet } from 'react-native';
import KTextInput from "../../components/KTextInput";
import CameraScreen from '../../components/Camera'

import { Ionicons, Octicons, AntDesign, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
/**
 * Validation schema
 * url, username, password validations here
 */
const validationSchema = yup.object().shape({
  stitch: yup
    .string()
    .required()
    .label("Stitch")
    .min(2, "Seems a bit short")
    .max(10, "We prefer insecure system"),
  description: yup
    .string()
    .required()
    .label("Description")
    .min(2, "Description should be atleast 2 characters"),
   
});


const AddStitch = (props) => {
  const [cameraOpen, setCameraOpen] = useState(false)
  const [images, setImages] = useState([])

  const handlePicture = (data) => {
    setImages([...images, data]);
    setCameraOpen(false)
    console.log("HANDLE PICTURE ", data, images);
  }
  const closeCamera = () => {
    setCameraOpen(false)
  }
  const popImage = (url) => {
    setImages(images.filter(function (obj) {
      return obj.uri !== url;
    }));
  }
  console.log("props >>> ", props);
  return (
    <Container style={{ flex: 1 }}>
      {cameraOpen ?
        <CameraScreen cameraPictureUpdate={handlePicture} closeCamera={closeCamera}></CameraScreen>
        : (
          <View style={styles.container}>
            <View style={styles.heading} >
              <H2>{props.isEditMode ? 'UPDATE' : 'ADD'} STITCH</H2>
            </View>
            <View style={styles.formbox} >
              <Formik
                initialValues={{
                  stitch: props.editData ? props.editData.stype : '', 
                  description: props.editData ? props.editData.description : ''
                }}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    props.navigation.navigate({ routeName: 'Stitch' })
                  }, 1000);
                }}
                validationSchema={validationSchema}
              >
                {formikProps => (
                  <View>
                    <KTextInput
                      placeholder="Stitch"
                      formikProps={formikProps}
                      formikKey="stitch"
                    />
                    <KTextInput
                      placeholder="Description"
                      formikProps={formikProps}
                      formikKey="description"
                    />
                    <View style={{display: 'flex', flexDirection:'row', justifyContent:'center', alignContent:'center'}}>
                      <View style={{ flex: 1, alignSelf: 'center',flexDirection: 'row' }}>
                        {images.map((image, index) => (
                          <TouchableOpacity style={{ padding: 10, textAlign: 'right' }}>
                            <MaterialCommunityIcons name="close" size={40} color="#b2b2b2"
                              onPress={() => { popImage(image.uri) }}
                            ></MaterialCommunityIcons>
                            <Thumbnail large source={{ uri: image.uri }} />
                          </TouchableOpacity>
                        ))}
                      </View>
                      <View style={{flex:1, alignItems:'flex-end', justifyContent:'flex-end', paddingRight:20}}>
                      <TouchableOpacity 
                        onPress={() => setCameraOpen(true)}>
                        <FontAwesome name="camera" size={80} color="#b2b2b2"></FontAwesome>
                      </TouchableOpacity>
                      </View>
                    </View>
                    <KPrimaryButton
                      title="ADD"
                      onPress={formikProps.handleSubmit}
                      style={{
                        marginHorizontal: 15,
                        paddingVertical: 20,
                        marginTop: 20
                      }}
                    />
                    
                    <KPrimaryButton
                      title="CANCEL"
                      onPress={props.cancelClick}
                      style={{
                        marginHorizontal: 15,
                        paddingVertical: 20,
                        marginTop: 20,
                        backgroundColor: '#F00'
                      }}
                    />
                  </View>
                )}
              </Formik>
            </View>
          </View>
        )
      }
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: 'Roboto_medium'
  },
  heading: {
    width: '100%',
    alignItems: 'center',
    padding:20
  },
  formbox: {
    width: '100%',
  },
})
export default AddStitch;
