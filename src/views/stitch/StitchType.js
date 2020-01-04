import React, {useState} from "react";
import { View, Text } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../../components/ProductCard";
import KFab from "../../components/KFab";
import AddStitchType from "./AddStitchType";

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
    <View style={{ flex: 1 }}>
      <ScrollView>
        {
          isAddNewVisible ? (
            <AddStitchType></AddStitchType>
          ) : <Text>Coming soon</Text>
        }
      </ScrollView>
      <KFab
        fabClicked={status => (status ? showListScreen() : showAddNewScreen())}
      ></KFab>
    </View>
  );
}

export default StitchType;
