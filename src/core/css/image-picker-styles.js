import {StyleSheet} from 'react-native';
var imageStyles = StyleSheet.create({
  flexRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  title:{
    flex: 1, padding: 15
  },
  positionRelativeView: { 
    padding: 10, 
    margin: 5, 
    position: "relative" 
  },
  closeIcon: { 
    position: "absolute", 
    top: -20,
    zIndex:99, 
    right: 0 
  },
  thumbSize: {
    width:100,
    height: 100
  }
});

export default imageStyles;