import React, {useState} from 'react'
import {
  Text,
  View
} from 'react-native'
import ImageView from 'react-native-image-view';
import { SliderBox } from "react-native-image-slider-box";
var styles = {
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
}

export default ImageSwiper = (props) =>  {
  const [isImageView, setImageView] = useState(false);
  const imageViewArr = [];
  props.images.forEach((element, index) => {
    const imageObj =  {
          source: {
              uri: element,
          },
          title: 'image_'+index,
          width: 806,
          height: 720,
      }
    imageViewArr.push(imageObj);
  });
    return (
      <View>
        {!isImageView && props.images ? 
          <SliderBox
              images={props.images}
              sliderBoxHeight={200}
              onCurrentImagePressed={index => {
                setImageView(true)
                console.warn(`image ${index} pressed`)}
              }
              dotColor="#FFEE58"
              inactiveDotColor="#90A4AE"
              dotStyle={{
                width: 15,
                height: 15,
                borderRadius: 15,
                marginHorizontal: 5,
                padding: 0,
                margin: 0
              }}
          /> : 
          <ImageView
              glideAlways
              images={imageViewArr}
              imageIndex={0}
              animationType="fade"
              isSwipeCloseEnabled = {true}
              isPinchZoomEnabled = {true}
              isVisible = {isImageView}
              onClose={() => setImageView(false)}
              renderFooter={(currentImage) => (<View style={{padding:10, backgroundColor: 'white'}}><Text>My footer</Text></View>)}
          />
        }
    </View>)
}