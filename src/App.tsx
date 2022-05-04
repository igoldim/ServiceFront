import React from 'react';
import { StatusBar } from 'expo-status-bar';

import RootStack from './components/Navigators/RootStack';

const App = () => {
  return (
    <>
      <StatusBar style='light'/>
      <RootStack />
    </>
  );
};

export default App;
