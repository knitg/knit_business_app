import React, {useState, useReducer, useEffect} from "react";
import { View, Text, Container } from "native-base";

import KFab from "../../../components/fab/KFab";
import AddUserType from "./AddUserType";
import Loader from "../../../components/Loader";

/** REDUX IMPORTS */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserTypeListAction, deleteUserTypeAction } from "../../../redux_store/actions/users/crud-user-type.actions";
import FlatUserCards from "../../../components/card/FlatUserCards";


function UserType(props) {
  useEffect(() => {
    props.getUserTypeListAction(); 

  }, [props.user_type_id]);

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
        console.log("\n\n\n\n\n EDIT CLICKED ", action);
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
        { props.loading ? <Loader></Loader> : 
          <Container>
            {state.isNew || state.isEdit ? (
              <View style={{ height:'100%', borderWidth:1, borderColor:'yellow', borderStyle:'solid'}}>
                <AddUserType isEditMode={state.isEdit} selectedUserType={selectedUserType} 
                    cancelClick={() => dispatch({type:'LIST'})}>
                </AddUserType> 
              </View>
            ) : (              
              <Container>
                {/* {props.delete_stitch_id ? props.getStitchList() : null} */}
                <FlatUserCards list={props.userTypeList} listMethod={props.getUserTypeListAction}
                  editAction={(editData) => dispatch({type: 'EDIT', data: editData})}
                  deleteAction = {(id) => dispatch({type: 'DELETE', data: id})}
                  ></FlatUserCards> 

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

const mapStateToProps = ({userType}) => { 
  console.log("MAP STATE PROP ", userType);
  return {
    userTypeList: userType.usertypeList,
    user_type_id: userType.user_type_id,
    loading: userType.loading,
    // delete_user_type_id: state
  }
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUserTypeListAction: getUserTypeListAction,
      deleteUserTypeAction: deleteUserTypeAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserType); 
