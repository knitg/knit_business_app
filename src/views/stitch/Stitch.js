import React, { useState, useEffect } from "react";
import { View, Text, Container, Fab } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../../components/ProductCard";
import KFab from "../../components/KFab";
import KFabAction from "../../components/KFabAction";
import ActionButton from "react-native-action-button";

import { Ionicons, Octicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import AddStitch from "./AddStitch";
import { getStitchListAction } from "../../redux_store/actions/stitch/stitch-list.actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const Stitch = (props) => {
  const [active, setActive] = useState(false);
  const [isAddNewVisible, setIsAddNewVisible] = useState(false);
  const [isEditEnable, setisEditEnable] = useState(false);
  const [editData, setEditData] = useState(null)

  useEffect(() => {
    props.getStitchList();
  }, []);

  const editIconClick = (data) => {
    setIsAddNewVisible(true);
    setisEditEnable(true);
    console.log("DATAAAAAAA>>> ", data);
    setEditData(data)
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
            {
              props.stitch_list && props.stitch_list.map((stitch, index) => {
                  return <ProductCard key={index} type={stitch}
                  editIconClick={() => {editIconClick(stitch)}}
                  ></ProductCard>
              })
            }
              
          </ScrollView>
        )}
        
       <KFab fabClicked={(status) => status ? showListScreen() : showAddNewScreen() }></KFab>
      
    </Container>
  );
}
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 25,
    height: 22,
    color: "white"
  }
});

const mapStateToProps = ({stitch}) => {
  console.log("MAP STATE >>>> ", stitch);
  return {
    stitch_list: stitch.stitchlist
  }
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getStitchList: getStitchListAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Stitch); 
