import React, {useEffect} from "react";
import { View, Text, Tab } from "native-base";
import HeaderToolBar from "../components/HeaderToolBar";
import KTabs from "../components/Tabs";
import Tailor from "./vendors/Tailor";
import Boutique from "./vendors/Boutique";
import FashionDesigner from "./vendors/FashionDesigner";
import MaggamDesigner from "./vendors/MaggamDesigner";
import Master from "./vendors/Master";

const tabs = [
  { id: 1, type: "Tailor", code: "tailor" },
  { id: 2, type: "Boutique", code: "boutique" },
  { id: 3, type: "Fashion Designer", code: "fashion_designer" },
  { id: 4, type: "Maggam Designer", code: "maggam_designer" },
  { id: 5, type: "Master", code: "master" }
];
const ScreenByCode = code => {
  switch (code) {
    case "tailor":
      return <Tailor />;
    case "boutique":
      return <Boutique />;
    case "fashion_designer":
      return <FashionDesigner />;
    case "maggam_designer":
      return <MaggamDesigner />;
    case "master":
      return <Master />; 
    default:
      return null;
  }
};
const Vendor = (props) => {
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

export default Vendor;
