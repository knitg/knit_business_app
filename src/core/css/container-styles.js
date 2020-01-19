import {StyleSheet} from 'react-native';
var styles = StyleSheet.create({
  flexEndRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  flexStartRow: {
    flex: 1, 
    alignSelf: "flex-start", 
    flexDirection: "row"
  },
  flex:{
    flex: 1
  },
  pAbsolute: {
    position: "absolute"
  },
  /*** PADDING STYLES */
  p0:{
    padding:0
  },
  p_5:{
    padding:5
  },
  p_10:{
    padding:10
  },
  p_15:{
    padding:15
  },
  p_lr_0:{
    paddingHorizontal:0
  },
  p_tb_0:{
    paddingVertical:0
  },
  p_lr_5:{
    paddingHorizontal: 5
  },
  p_lr_10:{
    paddingHorizontal: 10
  },
  p_lr_15:{
    paddingHorizontal: 15
  },
  p_tb_5:{
    paddingVertical: 5
  },
  p_tb_10:{
    paddingVertical: 10
  },
  p_tb_15:{
    paddingVertical: 15
  },
  /*** MARGIN STYLES */
  m0:{
    margin:0
  },
  m_lr_0:{
    marginHorizontal:0
  },
  m_tb_0:{
    marginVertical:0
  },
  m_lr_5:{
    marginHorizontal: 5
  },
  m_lr_10:{
    marginHorizontal: 10
  },
  m_lr_15:{
    marginHorizontal: 15
  },
  m_tb_5:{
    marginVertical: 5
  },
  m_tb_10:{
    marginVertical: 10
  },
  m_tb_15:{
    marginVertical: 15
  },
});

export default styles;