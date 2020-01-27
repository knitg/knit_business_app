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
  _isMounted = false;
  constructor(props){
    super(props);    
    const ASPECT_RATIO = width / height; 
    this.LONGITUDE_DELTA = 0.0922 * ASPECT_RATIO;

    /** Set Map Position */
    this.setMapPosition = (position) => {
      return {
        latitude: position && position.coords ? position.coords.latitude : 0,
        longitude: position && position.coords ? position.coords.longitude : 0,
        latitudeDelta: 0.0922,
        longitudeDelta: this.LONGITUDE_DELTA,
      }
    }
    /** Set Marker Position */
    this.setMarkerPosition = (position) => {
      return {
        latitude: position && position.coords ? position.coords.latitude : 0,
        longitude: position && position.coords ? position.coords.longitude : 0,
      }
    }
    this.state = {
      position: this.setMapPosition(),
      markerPosition: this.setMarkerPosition()
    };
    this.watchID = null;
    if(this.map){
      this.fitAllMarkers();
    } 
  }
  componentDidMount() {
    this._isMounted = true;    
    Geolocation.getCurrentPosition( position => {
        this.setState({position :this.setMapPosition(), markerPosition : this.setMarkerPosition() });
      }, error => console.log("get current position ERROR ", error));
    this.watchID = Geolocation.watchPosition(position => {
      this.setState({position :this.setMapPosition(), markerPosition : this.setMarkerPosition() });
      this.fitAllMarkers();
    });
  }
  componentWillUnmount() {
    // this._isMounted = false;
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }
  /*** FIT PADDING between markers */
  fitPadding() {
    this.map.fitToCoordinates([this.props.markers[0], this.props.markers[1]], {
      edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
      animated: true,
    });
  }

  /*** FIT PADDING between TWO markers */
  fitBottomTwoMarkers() {
    this.map.fitToCoordinates([this.props.markers[2], this.props.markers[3]], {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  }

  /*** FIT PADDING between ALL markers */
  fitAllMarkers() {
    this.map.fitToCoordinates(this.props.markers, {
      edgePadding: { top: 10, right: 10, bottom: 10, left: 10 },
      animated: true,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={this.state.position} ref={ref => this.map = ref} > 
          {this.props.markers.map((marker, i) => (
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
          <TouchableOpacity
            onPress={() => this.fitBottomTwoMarkers()}
            style={[styles.bubble, styles.button]}
          >
            <Text>Fit Bottom Two Markers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.fitAllMarkers()}
            style={[styles.bubble, styles.button]}
          >
          <Text>Fit All Markers {this.state.markerPosition.latitude} </Text>
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