import React, {useState, useEffect} from "react";
import { View, Text, Container } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../../components/ProductCard";
import KFab from "../../components/KFab";
import AddStitchType from "./AddStitchType";
import { getStitchTypeListAction } from "../../redux_store/actions/stitch/stitch-type-list.action";
import { bindActionCreators } from "redux"; 
import { connect } from "react-redux";

function StitchType(props) {
  const [isAddNewVisible, setIsAddNewVisible] = useState(false);
  const [isEditEnable, setisEditEnable] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedStitchItem, setSelectedStitchItem] = useState(null)

  useEffect(() => {
    props.getStitchTypeList();
    console.log(props.stitchTypeList)
  }, [props.stitch_type_id]);


  const editIconClick = (data) => {
    setIsAddNewVisible(true);
    setisEditEnable(true);
    setSelectedStitchItem(data)
  }
  const trashItemClick = (id) => {
    props.deleteStitchItem(id);
    props.getStitchList();
  }
  const showAddNewScreen = () => {
    setIsAddNewVisible(true);
    setisEditEnable(false);
    setEditData(null);
  };
  const showListScreen = () => {
    setIsAddNewVisible(false);
    setisEditEnable(false);
  };

  return (
    <Container style={{ flex: 1 }}>
      {
          isAddNewVisible ? (
              <View style={{ flex: 1}}>
                <AddStitchType  cancelClick={showListScreen}></AddStitchType>
              </View>
          ) : (
            <ScrollView>            
              {
                props.stitchTypeList && props.stitchTypeList.map((stitchtype, index) => {
                    return (
                      <ProductCard key={index} type={stitchtype}
                          editIconClick={() => {editIconClick(stitchtype)}}
                          trashIconClick={() => {trashItemClick(stitchtype.id)}}
                      ></ProductCard>
                    )
                })
              }              
            </ScrollView>
            )
        } 
      <KFab
        fabClicked={status => (status ? showListScreen() : showAddNewScreen())}
      ></KFab>
    </Container>
  );
}

const mapStateToProps = ({stitch}) => {
  console.log("STITCH TYPE MAP STATE >>>> ", stitch);
  return {
    stitchTypeList: stitch.stitchtypeList,
    stitch_type_id: stitch.stitch_type_id
  }
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getStitchTypeList: getStitchTypeListAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StitchType);
