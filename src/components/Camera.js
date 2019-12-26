import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";

import { Camera } from "expo-camera";

class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraImage: null
    };
  }
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    scanned: false
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }
  takePicture = async () => {
    console.log("OUTSIDE ");

    this.camera
      .takePictureAsync({ base64: true, quality: 0.3, skipProcessing: false })
      .then(data => {
        console.log("INSIDE ", data);
        this.props.cameraPictureUpdate(data);
      });
  };
  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };
  closeCamera = () => {
    this.props.closeCamera(true);
  };
  render() {
    const { hasCameraPermission, scanned } = this.state;
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={{ flex: 1 }}
          type={this.state.type}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignSelf: "flex-end",
                  alignItems: "center",
                  minHeight: 100,
                  backgroundColor: "#004796"
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  Flip
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 2,
                  justifyContent: "center",
                  alignSelf: "flex-end",
                  alignItems: "center",
                  minHeight: 100,
                  backgroundColor: "purple"
                }}
                onPress={() => this.takePicture()}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  TAKE PICTURE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignSelf: "flex-end",
                  alignItems: "center",
                  minHeight: 100,
                  backgroundColor: "#004796"
                }}
                onPress={() => this.closeCamera()}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  -Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cameraContainer: {
    marginHorizontal: 0,
    marginLeft: 0,
    marginStart: 0,
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingStart: 0,
    padding: 0
  },
  tabHeading: {
    backgroundColor: "white",
    height: 80
  },
  tabBarUnderline: {
    backgroundColor: "#29B6F6",
    height: 3
  }
});
export default CameraScreen;
