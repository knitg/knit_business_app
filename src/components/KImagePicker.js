import * as React from "react";
import { Button, Image, View, TouchableOpacity } from "react-native";
import ImagePicker from 'react-native-image-picker'; 
import * as Permissions from "expo-permissions";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Text, ActionSheet, Container } from "native-base";
import styles from "../core/css/container-styles";
import imageStyles from "../core/css/image-picker-styles";

export default class RN_ImagePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      photo: null,
    };
    if (this.props.hasImages && this.props.hasImages[0]) {
      console.log(this.props.hasImages)
      const imagesArr = this.props.hasImages.map((obj) => {
        return obj.image;
      })
      // const temp = this.state.images;
      // temp.push(imagesArr);
      this.setState({ images: imagesArr });
      
      this.props.onImageSelect(this.state.images);
    }
    //// CAMERA OPTIONS /////
    this.cameraOptions = { 
      allowsMultipleSelection: true,
      allowsEditing: true,
      maxWidth: 900,
      maxHeight: 900,
      exif: true,
      quality: 0.5
    }
  }
  /** Permission check  */
  getPermissionAsync = async () => { 
      const cameraStatus = await Permissions.askAsync(Permissions.CAMERA);
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted" && cameraStatus.status !== 'granted' ) {
        alert("Sorry, we need camera & camera roll permissions to make this work!");
      } 
  };
  /** Permission check  */
  componentDidMount() {
    console.log("this.props.hasImages >> ", this.props.hasImages);
    this.getPermissionAsync();
    if (this.props.hasImages) {
      const imagesArr = this.props.hasImages.map((obj) => {
        return obj.image;
      })
      this.setState({ images: imagesArr });
      console.log("this.props.hasImages >> ", this.state.images);
    }
  }

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <View style={styles.flexEndRow}>

          <Text style={imageStyles.title} >{this.props.heading ? this.props.heading : "Take picture"} </Text>
          
          <TouchableOpacity style={styles.p_10} onPress={this.pickImageFromLibrary}>
            <MaterialIcons name="photo-library" size={80} color="#2aa1ff" ></MaterialIcons>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.p_10} onPress={this.pickImageFromCamera}>
            <MaterialIcons name="camera-alt" size={80} color="#2aa1ff" ></MaterialIcons>
          </TouchableOpacity>

        </View>
        <View style={styles.flexStartRow}>
        
          {this.state.images ?
            this.state.images.map((image, index) => (
              <View key={index} style={imageStyles.positionRelativeView} >
                
                <MaterialCommunityIcons style={imageStyles.closeIcon} name="close-box" size={35} color="#333333" onPress={this.removeImage.bind(this, image)} > </MaterialCommunityIcons>
                
                <Image key={index} source={{ uri: image }} style={imageStyles.thumbSize} />
              
              </View>
            )) : null}
        </View>
      </Container>
    );
  }

  /** Remove image from an array */
  removeImage = img => {
    const temp = this.state.images;
    temp.splice(this.state.images.indexOf(img), 1);
    this.setState({ images: temp });
    this.props.onImageSelect(this.state.images);
  };
  
  /** PICK IMAGE */
  pickImageFromLibrary = () => {
    ImagePicker.launchImageLibrary(this.cameraOptions, result => {
      if (result.uri) {
        const temp = this.state.images;
        temp.push(result.uri);
        this.setState({ images: temp });
        if (this.props.onImageSelect) {
          this.props.onImageSelect(this.state.images);
        }
      }
    });
  };
  pickImageFromCamera = () => {
    ImagePicker.launchCamera(this.cameraOptions, res => {
      this.setState({photo: res.uri})
      if(res.uri){
        const temp = this.state.images;
        temp.push(res.uri);
        this.setState({ images: temp });
        if (this.props.onImageSelect) {
          this.props.onImageSelect(this.state.images);
        }
      }
    }); 
  };
}
