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
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

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
        <GooglePlacesAutocomplete
  placeholder='Enter Location'
  minLength={2}
  autoFocus={false}
  returnKeyType={'default'}
  fetchDetails={true}
  query={{ 
    key: 'AIzaSyB5yw05RlbSDkxqDF2Chm9Ob_RU2CPMVkE',
    language: 'en', // language of the results
    types: '(regions)' // default: 'geocode'
  }}
  styles={{
    textInputContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      borderTopWidth: 0,
      borderBottomWidth:0
    },
    textInput: {
      marginLeft: 0,
      marginRight: 0,
      height: 38,
      color: '#5d5d5d',
      fontSize: 16
    },
    predefinedPlacesDescription: {
      color: '#1faadb'
    },
  }}
  currentLocation={false}
/>
{/* <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}

      getDefaultValue={() => ''}

      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyB5yw05RlbSDkxqDF2Chm9Ob_RU2CPMVkE',
        language: 'en', // language of the results
        types: '(cities)' // default: 'geocode'
      }}

      styles={{
        textInputContainer: {
          width: '100%'
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}

      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        type: 'cafe'
      }}
      
      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: 'formatted_address',
      }}

      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      predefinedPlaces={[homePlace, workPlace]}
 
    /> */}

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