import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import { createAppContainer } from 'react-navigation'; 
import AppNavigator from './src/navigation-stacks/AppNavigator';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import StatusBar from './src/components/StatusBar';

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  const [isReady, setIsReady] = useState(false)
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const fetchFonts = async () => {
      Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      setIsReady(true)
    }
    fetchFonts();    
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }
  return (
      <AppContainer />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
