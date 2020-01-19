import React, {useState, useEffect, useReducer} from "react";
import { View, Text, Container } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../../components/ProductCard";
import KFab from "../../components/KFab";
import AddStitchType from "./AddStitchType";
import { getStitchTypeListAction } from "../../redux_store/actions/stitch/stitch-type-list.action";
import { bindActionCreators } from "redux"; 
import { connect } from "react-redux";

function StitchType(props) {
  
  useEffect(() => {
    props.getStitchTypeList();
  }, [props.delete_stitch_id, props.stitch_id]);
 
  /** INITIAL STATE */
  const initialState = {
    isList: true,
    isEdit: false,
    isNew: false
  }
  // SelectedStitchItem data
  const [selectedStitchItem, setSelectedStitchItem] = useState(null);

  /** USE REDUCER METHOD FOR LIST */
  const reducer = (state, action) => {
    switch(action.type) {
      case 'LIST':
        return {...state, isNew: false, isList: true, isEdit: false}
      case 'ADD':
        return {...state, isNew: true, isList: false, isEdit: false}
      case 'EDIT':
        setSelectedStitchItem(action.data)
        props.getStitchTypeList();
        return {...state, isNew: false, isList: false, isEdit: true}
      case 'DELETE':
        props.deleteStitchItem(action.id);
        props.getStitchTypeList();
        return {...state, isNew: false, isList: false, isEdit: false}
      default:
        return {...state, isNew: false, isList: true, isEdit: false}
    } 
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  /** Product Cards map */
  const productCard = () => {
      if(props.stitchTypeList) {
        return props.stitchTypeList.map((stitch, index) => {
            const images = [];
            stitch.images.forEach(obj => {
              images.push(obj.image);
            });
            return <ProductCard listItems={props.stitchTypeList} key={index} type={stitch} images={images}
                editIconClick={() => dispatch({type: 'EDIT', data: stitch})}
                trashIconClick={() => dispatch({type: 'DELETE', id: stitch.id})}
        ></ProductCard>
        });
      }
      return null;
  };
  
  return (
    <Container style={{ flex: 1 }}>
        {state.isNew || state.isEdit ? (
          <View style={{ height:'100%', borderWidth:1, borderColor:'yellow', borderStyle:'solid'}}>
            <AddStitchType isEditMode={state.isEdit} selectedStitchItem={selectedStitchItem} cancelClick={() => dispatch({type:'LIST'})}></AddStitchType>
          </View>
        ) : (
          <ScrollView> 
            {props.delete_stitch_id ? props.getStitchList() : null}
            { productCard() }              
          </ScrollView>
        )}
        {
          (state.isNew && state.isEdit) ? null : <KFab fabClicked={(status) => status ? dispatch({type: 'LIST'}) 
          : dispatch({type: 'ADD'})}></KFab>
        }
    </Container>
  );
}


const mapStateToProps = ({stitch}) => {
  console.log("STITCH TYPE MAP STATE >>>> ", stitch);
  return {
    stitchTypeList: stitch.stitchtypeList,
    stitch_type_id: stitch.stitch_type_id
  }
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getStitchTypeList: getStitchTypeListAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StitchType);
