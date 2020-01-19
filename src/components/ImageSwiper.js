import React, {useState} from 'react'
import {
  Text,
  View
} from 'react-native'
import ImageView from 'react-native-image-view';
import { SliderBox } from "react-native-image-slider-box";

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
              dotColor="#FFFFFF"
              inactiveDotColor="#90A4AE"
          /> 
          : 
          <ImageView
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