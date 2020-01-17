import React, { useState, useEffect, useReducer } from "react";
import { View, Container, Text } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../../components/ProductCard";
import KFab from "../../components/KFab";

import AddStitch from "./AddStitch";
import { getStitchListAction } from "../../redux_store/actions/stitch/stitch-list.actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteStitchAction } from "../../redux_store/actions/stitch/delete-stitch.actions";

const Stitch = (props) => {
  
  useEffect(() => {
    props.getStitchList();
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
  /** Product Card map */
  const productCard = () => {
      if(props.stitch_list) {
        console.log("PRODUCT CARDDDD ", props.stitch_list);
        return props.stitch_list.map((stitch, index) => {
              return <ProductCard key={index} type={stitch}
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
    </Container>
  );
}

const mapStateToProps = ({stitch}) => {
  return {
    stitch_list: stitch.stitchlist,
    delete_stitch_id: stitch.delete_stitch_id,
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
