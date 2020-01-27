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

import Geolocation from '@react-native-community/geolocation';


const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

const { width, height } = Dimensions.get('window');

class FitToCoordinates extends React.Component {
  async logFrames() {
    const visMarkersFrames = await this.map.getMarkersFrames(true);
    console.log('Visible markers frames:', visMarkersFrames);
    const allMarkersFrames = await this.map.getMarkersFrames();
    console.log('All markers frames:', allMarkersFrames);
  }

  constructor(props){
    super(props);
    this._isMounted = false;
    
    const ASPECT_RATIO = width / height;
    const LATITUDE = 0;
    const LONGITUDE = 0;
    const LATITUDE_DELTA = 0.0922;
    this.LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const SPACE = 0.01;

    this.state = {
      initialPosition: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: this.LONGITUDE_DELTA,
      },
      lastPosition: 'unknown',
      markerPosition: {
        latitude: LATITUDE,
        longitude: LONGITUDE        
      }
    };
    this.watchID = null;
    this.MARKERS = [];

    this.createMarker = (lat=this.state.initialPosition.latitude, 
      lng= this.state.initialPosition.longitude, modifier = 1) => {
      return {
        // latitude: lat - SPACE * modifier,
        // longitude: lng - SPACE * modifier,
        latitude: lat | 0,
        longitude: lng | 0
      };
    }
    this.MARKERS = [
      this.createMarker(17.48, 78.41),
      this.createMarker(17.14 , 77.04),
      this.createMarker(17.85, 76.10),
      this.createMarker(17.14 , 75.04),
  ];
  }
    componentDidMount() {
      this._isMounted = true;
      
      Geolocation.getCurrentPosition(
        position => {
          console.log("get current position ", position);
          const initialPosition = JSON.stringify(position);
          this.setState({initialPosition :{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: this.LONGITUDE_DELTA,
          }, markerPosition : {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
        // this.MARKERS[0] = this.createMarker(this.state.initialPosition.latitude, this.state.initialPosition.longitude, 1)
        
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
          latitudeDelta: 0.0922,
          longitudeDelta: this.LONGITUDE_DELTA,
        }, markerPosition : {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });      
      
      // this.MARKERS = this.createMarker(this.state.initialPosition.latitude, this.state.initialPosition.longitude, 1);
      this.fitAllMarkers();
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
    this.map.fitToCoordinates([this.MARKERS[0], this.MARKERS[1]], {
      edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
      animated: true,
    });
  }

  fitBottomTwoMarkers() {
    this.map.fitToCoordinates([this.MARKERS[2], this.MARKERS[3]], {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  }

  fitAllMarkers() {
    this.map.fitToCoordinates(this.MARKERS, {
      edgePadding: { top: 10, right: 10, bottom: 10, left: 10 },
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
          {this.MARKERS.map((marker, i) => (
            <Marker key={i} identifier={`id${i}`} coordinate={marker} />
          ))}
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.fitPadding()}
            style={[styles.bubble, styles.button]}
          >
            <Text>Fit Bottom Two Markers with Padding</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
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