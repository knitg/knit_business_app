import React, {useState, useEffect} from "react";
import { View, Text, Container } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../../components/ProductCard";
import KFab from "../../components/KFab";
import AddStitchType from "./AddStitchType";
import { getStitchTypeListAction } from "../../redux_store/actions/stitch/stitch-type-list.action";
import { bindActionCreators } from "redux"; 
import { connect } from "react-redux";
import { getStitchListAction } from "../../redux_store/actions/stitch/stitch-list.actions";

function StitchType(props) {
  const [isAddNewVisible, setIsAddNewVisible] = useState(false);
  const [isEditEnable, setisEditEnable] = useState(false);
  const [editData, setEditData] = useState(null);

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
              <Container style={{ flex: 1}}>
                <AddStitchType></AddStitchType>
              </Container>
          ) : (
            <ScrollView>
              <Text>Coming soon</Text>
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
    stitchTypeList: stitch.stitchtypeList
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
