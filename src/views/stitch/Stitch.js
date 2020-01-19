import React, { useState, useEffect, useReducer } from "react";
import { View, Container, Text } from "native-base";
import { ScrollView } from "react-native-gesture-handler";

/** COMPONENTS IMPORT */
import ProductCard from "../../components/ProductCard";
import KFab from "../../components/KFab";
import AddStitch from "./AddStitch";

import { Animated } from 'react-native';
/** REDUX IMPORTS */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getStitchListAction } from "../../redux_store/actions/stitch/stitch-list.actions";
import { deleteStitchAction } from "../../redux_store/actions/stitch/delete-stitch.actions";
import Loader from "../../components/Loader";

const Stitch = (props) => {
  const [animation, setAnimation] = useState(null);
  useEffect(() => {
    props.getStitchList();
  }, [props.delete_stitch_id, props.stitch_id, props.update_stitch_id]);
  
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
        props.getStitchList(); 
        return {...state, isNew: false, isList: false, isEdit: true}
      case 'DELETE':
        props.deleteStitchItem(action.id);
        props.getStitchList();
        return {...state, isNew: false, isList: false, isEdit: false}
      default:
        return {...state, isNew: false, isList: true, isEdit: false}
    } 
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  /** Product Cards map */
  const productCard = () => {
      if(props.stitch_list) {
        return props.stitch_list.map((stitch, index) => {
            const images = [];
            stitch.images.forEach(obj => {
              images.push(obj.image);
            });
            return <ProductCard listItems={props.stitch_list} key={index} type={stitch} images={images}
                editIconClick={() => dispatch({type: 'EDIT', data: stitch})}
                trashIconClick={() => dispatch({type: 'DELETE', id: stitch.id})}
        ></ProductCard>
        });
      }
      return null;
  };
  
  return (
    <Container style={{ flex: 1 }}>
        { props.loading ? <Loader></Loader> : 
          <View>
            {state.isNew || state.isEdit ? (
              <View style={{ height:'100%', borderWidth:1, borderColor:'yellow', borderStyle:'solid'}}>
                <AddStitch isEditMode={state.isEdit} selectedStitchItem={selectedStitchItem} cancelClick={() => dispatch({type:'LIST'})}></AddStitch>
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
          </View> 
        }
    </Container>
  );
}

const mapStateToProps = ({stitch}) => {
  console.log("MAP STITCH ", stitch);
  return {
    stitch_list: stitch.stitchlist,
    loading: stitch.loading,
    delete_stitch_id: stitch.delete_stitch_id,
    update_stitch_id: stitch.update_stitch_id,
    stitch_id: stitch.stitch_id
  }
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getStitchList: getStitchListAction,
      deleteStitchItem: deleteStitchAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Stitch); 
