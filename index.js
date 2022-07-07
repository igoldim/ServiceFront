import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

//https://stackoverflow.com/questions/52830312/how-to-upload-image-to-server-using-axios-in-react-native
//https://stackoverflow.com/questions/42167094/react-native-image-upload
//https://reactnative.dev/docs/network.html#using-fetch