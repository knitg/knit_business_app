import React from "react";
import { Tab, Tabs, ScrollableTab } from 'native-base';

const KTabs = props => {
  const { title } = props;
  return ( 
    <Tabs renderTabBar={()=> <ScrollableTab />}>
        {props.children}
    </Tabs>
  );
};

export default KTabs;
