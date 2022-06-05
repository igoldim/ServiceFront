import React from 'react';
import { StatusBar } from 'expo-status-bar';

import RootStack from './components/Navigators/RootStack';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  React.useEffect(()=>{
    const handleVersion = async () => {
      await AsyncStorage.setItem("versao", "0.0.059");
    };
    handleVersion();
    return () => {}
  }, []);

  return (
    <>
      <StatusBar style='light'/>
      <RootStack />
    </>
  );
};

export default App;
