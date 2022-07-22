import React from 'react';
import RootStack from './components/Navigators/RootStack';
import {enableLatestRenderer} from 'react-native-maps';

const App = () => {
    enableLatestRenderer();
    return (
    <RootStack />
  );
};

export default App;