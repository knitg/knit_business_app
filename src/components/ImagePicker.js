import * as React from "react";
import { Button, Image, View, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, ActionSheet, Container } from "native-base";

const BUTTONS = [
  {
    text: "Take picture from Camera",
    icon: "photo-library",
    iconColor: "#2c8ef4"
  },
  {
    text: "Take picture from Gallery",
    icon: "camera-alt",
    iconColor: "#f42ced"
  },
  { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
export default class KImagePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
    console.log("this.state >>>> ", this.state, this.props);
    if (this.props.hasImages) {
      const temp = this.state.images;
      temp.push(this.props.hasImages[0].image);
      this.setState({ images: temp });
      console.log("this.props.hasImages >> ", this.state.images);
      this.props.onImageSelect(this.state.images);
    }
  }
  componentDidMount() {
    console.log("this.props.hasImages >> ", this.props.hasImages);
    if (this.props.hasImages) {
      this.setState({ images: this.props.hasImages });
      console.log("this.props.hasImages >> ", this.state.images);
    }
  }

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end"
          }}
        >

          <Text style={{ flex: 1, padding: 15 }} >{this.props.heading ? this.props.heading : "Take picture"} </Text>
          <TouchableOpacity style={{ padding: 10 }} onPress={this._pickImage}>
            <MaterialIcons
              name="photo-library"
              size={80}
              color="#2aa1ff"
            ></MaterialIcons>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10 }} onPress={this._pickFromCamera}>
            <MaterialIcons
              name="camera-alt"
              size={80}
              color="#2aa1ff"
            ></MaterialIcons>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignSelf: "flex-start", flexDirection: "row" }}>
          {this.state.images &&
            this.state.images.map((image, index) => (
              <View
                key={index}
                style={{ padding: 10, margin: 5, position: "relative" }}
              >
                <MaterialCommunityIcons
                  style={{ position: "absolute", top: -22, right: 5 }}
                  name="close-box"
                  size={35}
                  color="#333333"
                  onPress={this.popImage.bind(this, image)}
                ></MaterialCommunityIcons>
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={{ width: 100, height: 100 }}
                />
              </View>
            ))}
        </View>
      </Container>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
    console.log("hi");
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  /** Remove image from an array */
  popImage = img => {
    console.log(this.state.images, img, this.state.images.indexOf(img));
    const temp = this.state.images;
    temp.splice(this.state.images.indexOf(img), 1);
    this.setState({ images: temp });
    this.props.onImageSelect(this.state.images);
  };

  /** PICK IMAGE */
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3
    });
    if (!result.cancelled) {
      const temp = this.state.images;
      temp.push(result.uri);
      this.setState({ images: temp });
      if (this.props.onImageSelect) {
        this.props.onImageSelect(this.state.images);
      }
    }
  };

  _pickFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3
    });
    if (!result.cancelled) {
      const temp = this.state.images;
      temp.push(result.uri);
      this.setState({ images: temp });
      if (this.props.onImageSelect) {
        this.props.onImageSelect(this.state.images);
      }
    }
  };
}
