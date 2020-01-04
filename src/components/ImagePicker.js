import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
export default class KImagePicker extends React.Component {
  state = { 
    images: []
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-around' }}>
            <MaterialIcons name="photo-library" size={80} color="#b2b2b2" onPress={this._pickImage}></MaterialIcons>
            <MaterialIcons name="camera-alt" size={80} color="#b2b2b2" onPress={this._pickFromCamera}></MaterialIcons>
        </View>
        <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
            {this.state.images && this.state.images.map((image, index) => (
              <View style={{padding:10, margin:5, position:'relative'}}>                
                <FontAwesome style={{position:'absolute', top:0, right: 0, zIndex: 99}} name="window-close" 
                size={40} color="#333333" onPress={this.popImage.bind(this, image)}></FontAwesome>
                <Image key={index} source={{ uri: image }} style={{ width: 100, height: 100 }} />
              </View>
            ))}
        </View> 
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
    console.log('hi');
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
  /** Remove image from an array */
  popImage = (img) => {
    console.log(this.state.images, img, this.state.images.indexOf(img))
    const temp = this.state.images;
    temp.splice(this.state.images.indexOf(img), 1)
    this.setState({images: temp})
    this.props.onImageSelect(this.state.images);
  }
  
  /** PICK IMAGE */
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    }); 
    if (!result.cancelled) {
      const temp = this.state.images;
      temp.push(result.uri);
      this.setState({images: temp}) 
      if(this.props.onImageSelect) {
        this.props.onImageSelect(this.state.images);
      }
    }
  };

  _pickFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.cancelled) {
      const temp = this.state.images;
      temp.push(result.uri);
      this.setState({images: temp}) 
      if(this.props.onImageSelect) {
        this.props.onImageSelect(this.state.images);
      }
    }
  };

}