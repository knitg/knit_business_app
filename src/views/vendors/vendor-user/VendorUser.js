import React, { useState, useEffect, useReducer } from "react";
import { View, Container, Text } from "native-base"; 

/** COMPONENTS IMPORT */ 

/** REDUX IMPORTS */
import { connect } from "react-redux";
import { bindActionCreators } from "redux"; 
import Loader from "../../../components/Loader"; 
import AddVendor from "./AddVendorUser";
import KFab from "../../../components/fab/KFab";

const VendorUser = (props) => {
//   const createMarker = (lat=this.state.position.latitude,  lng= this.state.position.longitude) => {
//     return {
//       latitude: lat | 0,
//       longitude: lng | 0
//     };
//   }
//   const markers = [
//     createMarker(17.48, 78.41),
//     createMarker(17.14 , 77.04),
//     createMarker(17.85, 76.10),
//     createMarker(17.14 , 75.04),
// ];
  useEffect(() => {
    // props.getStitchList(); 

  }, []);
  
  /** INITIAL STATE */
  const initialState = {
    isList: true,
    isEdit: false,
    isNew: false
  }
  // SelectedStitchItem data
  const [selectedTailor, setSelectedTailor] = useState(null);

  /** USE REDUCER METHOD FOR LIST */
  const reducer = (state, action) => {
    switch(action.type) {
      case 'LIST':
        return {...state, isNew: false, isList: true, isEdit: false}
      case 'ADD':
        return {...state, isNew: true, isList: false, isEdit: false}
      case 'EDIT':
        // setSelectedStitchItem(action.data)
        // props.getStitchList(); 
        return {...state, isNew: false, isList: false, isEdit: true}
      case 'DELETE':
        setSelectedStitchItem(action.data)
        // props.deleteStitchItem(action.data);
        // props.getStitchList();
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
                <AddVendor isEditMode={state.isEdit} selectedTailor={selectedTailor} cancelClick={() => dispatch({type:'LIST'})}></AddVendor>
              </View>
            ) : (
              <Container>
                {/* {props.delete_stitch_id ? props.getStitchList() : null} */}
                {/* <FitToCoordinates provider={PROVIDER_GOOGLE} markers= {markers}></FitToCoordinates> */}
                {/* <FlatCardsList list={props.stitch_list} listMethod={props.getStitchList}
                  editAction={(editData) => dispatch({type: 'EDIT', data: editData})}
                  deleteAction = {(id) => dispatch({type: 'DELETE', data: id})}
                  ></FlatCardsList> */}
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

const mapStateToProps = ({tailor}) => {
  // console.log("MAP STITCH ", stitch);
  return {
    tailors_list: tailor
  }
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // getStitchList: getStitchListAction,
      // deleteStitchItem: deleteStitchAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorUser); 
