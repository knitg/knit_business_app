import React, {useEffect} from "react";
import { View, Text, Tab } from "native-base";
import HeaderToolBar from "../components/HeaderToolBar";
import KTabs from "../components/Tabs";
import Stitch from "./stitch/Stitch";
import StitchTypeDesign from "./stitch/StitchTypeDesign";
import StitchType from "./stitch/StitchType";

const tabs = [
  { id: 1, type: "Stitch", code: "stitch" },
  { id: 2, type: "Stitch Type", code: "stitch_type" },
  { id: 3, type: "Stitch Design", code: "stitch_type_design" }
];
const ScreenByCode = code => {
  switch (code) {
    case "stitch":
      return <Stitch />;
    case "stitch_type":
      return <StitchType />;
    case "stitch_type_design":
      return <StitchTypeDesign />;   
    default:
      return null;
  }
};
const StitchView = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <HeaderToolBar showBack={true} showSearch={true}></HeaderToolBar>
      <KTabs>
        {tabs.map((tab, index) => (
          <Tab key={index} heading={tab.type}>
            {ScreenByCode(tab.code)}
          </Tab>
        ))}
      </KTabs>
    </View>
  );
};

export default StitchView;
