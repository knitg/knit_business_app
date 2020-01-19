import React, {useReducer} from "react";
import ProductCard from "./ProductCard";

const ProductCards = (props) => {

  
  const [state, dispatch] = useReducer(reducer, initialState);

  const { stitch_list } = props;
  return stitch_list.map((stitch, index) => {
    const images = [];
    if(stitch.images) {
      stitch.images.forEach(obj => {
        images.push(obj.image); 
      });
    }
    console.log("IMAGESSSSSSS>>>> ", images);
    return <ProductCard key={index} type={stitch} images={images}
              editIconClick={() => dispatch({type: 'EDIT', data: stitch})}
              trashIconClick={() => dispatch({type: 'DELETE', id: stitch.id})}
          ></ProductCard>
  });
}

export default ProductCards;
