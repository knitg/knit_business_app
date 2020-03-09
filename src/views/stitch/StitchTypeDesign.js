import React, { useState, useEffect, useReducer } from "react";
import { View, Container, Text } from "native-base";
import { ScrollView } from "react-native-gesture-handler";

/** COMPONENTS IMPORT */ 
import KFab from "../../components/fab/KFab";

/** REDUX IMPORTS */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Loader from "../../components/Loader";
import AddStitchType from "./AddStitchType";
import { getStitchTypeDesignListAction, deleteStitchTypeDesignAction } from "../../redux_store/actions/stitch/crud-stitch-design.action";
import FlatCardsList from "../../components/card/FlatProductCards";
import AddStitchTypeDesign from "./AddStitchTypeDesign";
import ProductCard from "../../components/card/ProductCard";

const StitchTypeDesign = (props) => {
  useEffect(() => {
    props.getStitchTypeDesignService();
  }, [props.delete_stitch_type_design_id, props.stitch_type_design_id]);
  
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
        props.getStitchTypeDesignService(); 
        return {...state, isNew: false, isList: false, isEdit: true}
      case 'DELETE':
        props.deleteStitchTypeAction(action.id);
        props.getStitchTypeDesignService();
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
        { props.loading ? <Loader></Loader> : 
          <Container>
            {state.isNew || state.isEdit ? (
              <View style={{ height:'100%', borderWidth:1, borderColor:'yellow', borderStyle:'solid'}}>
                <AddStitchTypeDesign isEditMode={state.isEdit} selectedStitchItem={selectedStitchItem} cancelClick={() => dispatch({type:'LIST'})}>
                </AddStitchTypeDesign>
              </View>
            ) : (
              <Container>
                {props.delete_stitch_id ? props.getStitchTypeDesignService() : null}
                <FlatCardsList list={props.stitchTypeList} listMethod={props.getStitchTypeDesignService}
                  editAction={(editData) => dispatch({type: 'EDIT', data: editData})}
                  deleteAction = {(id) => dispatch({type: 'DELETE', data: id})}
                  ></FlatCardsList>
              </Container>
            )}
            {
              (state.isNew && state.isEdit) ? null : <KFab fabClicked={(status) => status ? dispatch({type: 'LIST'}) 
              : dispatch({type: 'ADD'})}></KFab>
            }
          </Container> 
        }
    </Container>
  );
}

const mapStateToProps = ({stitchTypeDesign}) => {
  console.log("MAP STITCH ", stitchTypeDesign);
  return {
    stitchTypeDesignList: stitchTypeDesign.stitchtypeDesignsList,
    stitch_type_design_id: stitchTypeDesign.stitch_type_design_id,
    loading: stitchTypeDesign.loading,
    delete_stitch_type_design_id: stitchTypeDesign.delete_stitch_type_design_id
  }
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getStitchTypeDesignService: getStitchTypeDesignListAction,
      deleteStitchTypeDesignService: deleteStitchTypeDesignAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StitchTypeDesign); 
