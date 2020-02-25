import React, {useState, useReducer} from "react";
import { View, Text, Container } from "native-base";

import KFab from "../../../components/KFab";
import AddUserType from "./AddUserType";
import Loader from "../../../components/Loader";

/** REDUX IMPORTS */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


function UserType(props) {
  
  
  /** INITIAL STATE */
  const initialState = {
    isList: true,
    isEdit: false,
    isNew: false
  }
  
  // SelectedUserRole
  const [selectedUserType, setSelectedUserType] = useState(null);

  /** USE REDUCER METHOD FOR LIST */
  const reducer = (state, action) => {
    switch(action.type) {
      case 'LIST':
        return {...state, isNew: false, isList: true, isEdit: false}
      case 'ADD':
        return {...state, isNew: true, isList: false, isEdit: false}
      case 'EDIT':
        // setSelectedStitchItem(action.data);
        // console.log("\n\n\n\n\n EDIT CLICKED ", action);
        // props.getStitchTypeList(); 
        return {...state, isNew: false, isList: false, isEdit: true}
      case 'DELETE':
        // setSelectedStitchItem(action.data)
        // props.deleteStitchTypeAction(action.data);
        // props.getStitchTypeList();
        return {...state, isNew: false, isList: false, isEdit: false}
      default:
        return {...state, isNew: false, isList: true, isEdit: false}
    } 
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Container style={{ flex: 1 }}>
        {/* { props.loading ? <Loader></Loader> :  */}
          <Container>
            {state.isNew || state.isEdit ? (
              <View style={{ height:'100%', borderWidth:1, borderColor:'yellow', borderStyle:'solid'}}>
                <AddUserType isEditMode={state.isEdit} selectedUserType={selectedUserType} 
                    cancelClick={() => dispatch({type:'LIST'})}>
                </AddUserType> 
              </View>
            ) : (              
              <Container>
                {/* {props.delete_stitch_id ? props.getStitchList() : null}
                <FlatCardsList list={props.stitchTypeList} listMethod={props.getStitchTypeList}
                  editAction={(editData) => dispatch({type: 'EDIT', data: editData})}
                  deleteAction = {(id) => dispatch({type: 'DELETE', data: id})}
                  ></FlatCardsList> */}
                  <Text>USER LIST</Text>

              </Container>
            )}
            {
              (state.isNew && state.isEdit) ? null : <KFab fabClicked={(status) => status ? dispatch({type: 'LIST'}) 
              : dispatch({type: 'ADD'})}></KFab>
            }
          </Container> 
        {/* } */}
    </Container>
  );
}

const mapStateToProps = (state) => { 
  return {
    userTypeList: state,
    user_type_id: state,
    loading: state,
    delete_user_type_id: state
  }
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // getUserTypeList: getUserTypeListAction,
      // deleteUserTypeAction: deleteUserTypeAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserType); 
