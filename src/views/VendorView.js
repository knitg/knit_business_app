import React, {useEffect} from "react";
import { View, Text, Tab } from "native-base";
import HeaderToolBar from "../components/HeaderToolBar"; 
import Vendor from "./vendors/Vendor"; 

const VendorView = (props) => {
  console.log("VENDOR VIEWWWW HEREE");
  return (
    <View style={{ flex: 1 }}>
      <HeaderToolBar showBack={true} showSearch={true}  title="Vendors"></HeaderToolBar>
      <Vendor />
    </View>
  );
};

export default VendorView;
