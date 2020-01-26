import React, { useState, useEffect, useReducer } from "react";
import { View, Container, Text } from "native-base"; 
import KFab from "../../components/KFab";

/** REDUX IMPORTS */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Loader from "../../components/Loader";
import AddStitchType from "./AddStitchType";
import { deleteStitchTypeAction, getStitchTypeListAction } from "../../redux_store/actions/stitch/crud-stitch-type.action";
import FlatCardsList from "../../components/FlatProductCards";

const StitchType = (props) => { 
  useEffect(() => {
    props.getStitchTypeList();
  }, [props.delete_stitch_id, props.stitch_type_id]);
  
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
        setSelectedStitchItem(action.data);
        console.log("\n\n\n\n\n EDIT CLICKED ", action);
        props.getStitchTypeList(); 
        return {...state, isNew: false, isList: false, isEdit: true}
      case 'DELETE':
        setSelectedStitchItem(action.data)
        props.deleteStitchTypeAction(action.data);
        props.getStitchTypeList();
        return {...state, isNew: false, isList: false, isEdit: false}
      default:
        return {...state, isNew: false, isList: true, isEdit: false}
    } 
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Container style={{ flex: 1 }}>
        { props.loading ? <Loader></Loader> : 
          <Container>
            {state.isNew || state.isEdit ? (
              <View style={{ height:'100%', borderWidth:1, borderColor:'yellow', borderStyle:'solid'}}>
                <AddStitchType isEditMode={state.isEdit} selectedStitchItem={selectedStitchItem} cancelClick={() => dispatch({type:'LIST'})}>
                </AddStitchType>
              </View>
            ) : (              
              <Container>
                {props.delete_stitch_id ? props.getStitchList() : null}
                <FlatCardsList list={props.stitchTypeList} listMethod={props.getStitchTypeList}
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

const mapStateToProps = ({stitch, stitchType}) => { 
  return {
    stitchTypeList: stitchType.stitchtypeList,
    stitch_type_id: stitchType.stitch_type_id,
    loading: stitchType.loading,
    delete_stitch_type_id: stitchType.delete_stitch_type_id
  }
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getStitchTypeList: getStitchTypeListAction,
      deleteStitchTypeAction: deleteStitchTypeAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StitchType); 
