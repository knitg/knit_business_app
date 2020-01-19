import React from "react";
import { Tab, Tabs, ScrollableTab } from 'native-base';

const KTabs = props => {
  const { title } = props;
  return ( 
    <Tabs renderTabBar={()=> <ScrollableTab />} page={props.page} locked={true}>
        {props.children}
    </Tabs>
  );
};

export default KTabs;
