import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
import Geolocation from '@react-native-community/geolocation';

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

function createMarker(modifier = 1) {
  return {
    latitude: LATITUDE - SPACE * modifier,
    longitude: LONGITUDE - SPACE * modifier,
  };
}

const MARKERS = [
  createMarker(),
    //   createMarker(2),
    //   createMarker(3),
    //   createMarker(4),
];

const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

class FitToCoordinates extends React.Component {
  _isMounted = false;
    state = {
      initialPosition: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      lastPosition: 'unknown',
      markerPosition: {
        latitude: LATITUDE,
        longitude: LONGITUDE        
      }
    };
    watchID = null;
    componentDidMount() {
      this._isMounted = true;
      Geolocation.getCurrentPosition(
        position => {
          console.log("get current position ", position);
          const initialPosition = JSON.stringify(position);
          this.setState({initialPosition :{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }, markerPosition : {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
        },
        error => console.log("get current position ERROR ", error),
        {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
      );
      this.watchID = Geolocation.watchPosition(position => {
        console.log("WATCH POSI", position)
        const lastPosition = JSON.stringify(position);
        this.setState({initialPosition :{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }, markerPosition : {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });
        // this.setState({lastPosition});
      });
    }
    componentWillUnmount() {
      this._isMounted = false;
      this.watchID != null && Geolocation.clearWatch(this.watchID);
    }
  async logFrames() {
    const visMarkersFrames = await this.map.getMarkersFrames(true);
    console.log('Visible markers frames:', visMarkersFrames);
    const allMarkersFrames = await this.map.getMarkersFrames();
    console.log('All markers frames:', allMarkersFrames);
  }

  fitPadding() {
    this.map.fitToCoordinates([MARKERS[2], MARKERS[3]], {
      edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
      animated: true,
    });
  }

  fitBottomTwoMarkers() {
    this.map.fitToCoordinates([MARKERS[2], MARKERS[3]], {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  }

  fitAllMarkers() {
    this.map.fitToCoordinates(MARKERS, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          style={styles.map}
          initialRegion={this.state.initialPosition}
        >
           <Marker identifier={`id1`} coordinate={this.state.markerPosition} />
          {/* {MARKERS.map((marker, i) => (
            <Marker key={i} identifier={`id${i}`} coordinate={marker} />
          ))} */}
        </MapView>
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity
            onPress={() => this.fitPadding()}
            style={[styles.bubble, styles.button]}
          >
            <Text>Fit Bottom Two Markers with Padding</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.fitBottomTwoMarkers()}
            style={[styles.bubble, styles.button]}
          >
            <Text>Fit Bottom Two Markers</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => this.fitAllMarkers()}
            style={[styles.bubble, styles.button]}
          >
  <Text>Fit All Markers {this.state.markerPosition.latitude} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.logFrames()}
            style={[styles.bubble, styles.button]}
          >
            <Text>Log markers frames {this.state.markerPosition.longitude}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    marginTop: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default FitToCoordinates;