import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('knit_business_app', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('knit_business_app', { rootTag });
}
