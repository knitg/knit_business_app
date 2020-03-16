import React, { useEffect, useState, useReducer } from "react";
import { View, Container } from "native-base";
import { bindActionCreators } from "redux";
import { connect } from "react-redux"; 
import FlatVendorCardList from "../../components/card/FlatVendorCardList";
import Loader from "../../components/Loader";

import AddUser from "../user/user-list/AddUser";
import KFab from "../../components/fab/KFab";
import { getUserTypeListAction } from "../../redux_store/actions/users/crud-user-type.actions";
import {
  getVendorListAction, getVendorDetailAction, deleteVendorAction
} from "../../redux_store/actions/vendor/crud-vendor.actions";
import AddNewVendor from "./AddNewVendor";

const Vendor = props => {
  console.log("H - vendor COMPONENT CREATE \n\n\n\n", props);

  const [step, setStep] = useState(0);
  useEffect(() => {
    console.log("vendor CAKKED \n\n\n\n\n\n\n\n\n\n\n\n\n\n")
    props.getVendorListAction();
  }, [props.vendorId, props.deleteVendor, props.update_vendor_id]);
  
  useEffect(() => {
    console.log("vendor BACKKK \n\n\n\n\n\n\n\n\n\n\n\n\n\n")
    props.getUserTypeListAction();
  }, [step]);


  /** INITIAL STATE */
  const initialState = {
    isList: true,
    isEdit: false,
    isNew: false
  };
  // SelectedStitchItem data
  const [selectedVendor, setSelectedVendor] = useState(null);

  /** USE REDUCER METHOD FOR LIST */
  const reducer = (state, action) => {
    console.log("ACTION TYPE ", action);
    switch (action.type) {
      case "LIST":
        console.log("inside LISt");
        return { ...state, isNew: false, isList: true, isEdit: false };
      case "ADD":
        console.log("inside add");
        return { ...state, isNew: true, isList: false, isEdit: false };
      case "EDIT":
        setSelectedVendor(action.data);
        props.getVendorListAction();
        return { ...state, isNew: false, isList: false, isEdit: true };
      case "DELETE":
        console.log("\n\n\n\n ACTION DELETE ");
        setSelectedVendor(action.data);
        const deleteVendor = props.deleteVendorAction(action.data);
        console.log("deletevendor >>>> ", deleteVendor);
        props.getVendorListAction();
        return { ...state, isNew: false, isList: false, isEdit: false };
      default:
        return { ...state, isNew: false, isList: true, isEdit: false };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
 
  return (
    <Container style={{ flex: 1 }}>
      {props.loading ? (
        <Loader></Loader>
      ) : (
        <Container>
          {state.isNew || state.isEdit ? (
            <View
              style={{
                height: "100%",
                borderWidth: 1,
                borderColor: "yellow",
                borderStyle: "solid"
              }}
            > 
              <AddNewVendor
                isEditMode={state.isEdit}
                userTypeList= {props.userTypeList}
                selectedVendor={selectedVendor}
                cancelClick={() => dispatch({ type: "LIST" })}
              ></AddNewVendor>
            </View>
          ) : (
            <Container>
              <FlatVendorCardList
                list={props.vendorList}
                listMethod={props.getVendorListAction}
                editAction={editData =>
                  dispatch({ type: "EDIT", data: editData })
                }
                deleteAction = {(id) => dispatch({type: 'DELETE', data: id})}
              ></FlatVendorCardList>
            </Container> 
          )}
          {state.isNew && state.isEdit ? null : (
            <KFab
              fabClicked={status =>
                status ? dispatch({ type: "LIST" }) : dispatch({ type: "ADD" })
              }
            ></KFab>
          )}
        </Container>
      )}
    </Container>
  );
};
const mapStateToProps = ({ vendor, userType }) => {
  console.log("MAPPPPPSSSS STATE ", vendor);
  return {
    vendorList: vendor.vendorList,
    userTypeList: userType.usertypeList,
    vendorDetail: vendor.vendorDetails,
    loading: vendor.loading,
    vendorId: vendor.vendor_id,
    update_vendor_id: vendor.update_vendor_id,
    deleteVendor: vendor.delete_vendor_id
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getVendorListAction: getVendorListAction,
      getUserTypeListAction: getUserTypeListAction,
      getVendorDetailAction: getVendorDetailAction,
      deleteVendorAction: deleteVendorAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Vendor);
