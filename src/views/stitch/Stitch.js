import React, { useState, useEffect } from "react";
import { View, Container } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../../components/ProductCard";
import KFab from "../../components/KFab";

import AddStitch from "./AddStitch";
import { getStitchListAction } from "../../redux_store/actions/stitch/stitch-list.actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteStitchAction } from "../../redux_store/actions/stitch/delete-stitch.actions";

const Stitch = (props) => { 
  const [isAddNewVisible, setIsAddNewVisible] = useState(false);
  const [isEditEnable, setisEditEnable] = useState(false);
  const [editData, setEditData] = useState(null)

  useEffect(() => {
    props.getStitchList();
  }, [props.delete_stitch_id]);

  const editIconClick = (data) => {
    setIsAddNewVisible(true);
    setisEditEnable(true);
    console.log("DATAAAAAAA>>> ", data);
    setEditData(data)
  }
  const trashItemClick = (id) => {
    props.deleteStitchItem(id);
    props.getStitchList();
  }

  const showAddNewScreen = () => {
    setIsAddNewVisible(true);
    setisEditEnable(false);
    setEditData(null)
  }
  const showListScreen = () => {
    setIsAddNewVisible(false);
    setisEditEnable(false);
  }

  return (
    <Container style={{ flex: 1 }}> 
        {isAddNewVisible ? (
          <View style={{ height:'100%', borderWidth:1, borderColor:'yellow', borderStyle:'solid'}}>
            <AddStitch isEditMode={isEditEnable} editData={editData} cancelClick={showListScreen}></AddStitch>
          </View>
        ) : (
          <ScrollView> 
            {props.delete_stitch_id ? props.getStitchList() : null}
            {
              props.stitch_list && props.stitch_list.map((stitch, index) => {
                  return <ProductCard key={index} type={stitch}
                  editIconClick={() => {editIconClick(stitch)}}
                  trashIconClick={() => {trashItemClick(stitch.id)}}
                  ></ProductCard>
              })
            }              
          </ScrollView>
        )}
        {
          (isAddNewVisible && isEditEnable) ? null : <KFab fabClicked={(status) => status ? showListScreen() : showAddNewScreen() }></KFab>
        }      
      
    </Container>
  );
}

const mapStateToProps = ({stitch}) => {
  console.log("MAP STATE >>>> ", stitch);
  return {
    stitch_list: stitch.stitchlist,
    delete_stitch_id: stitch.delete_stitch_id
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
