import React from 'react';
import { Container, Logo } from './Welcome.s';
import { slug } from '../../../../app.json';
import { getApp } from '../../../services';
import BigText from '../../../components/Texts/BigText';
import RegularText from '../../../components/Texts/RegularText';
import RegularButton from '../../../components/Buttons/RegularButton';
import AsyncStorage from '@react-native-community/async-storage';
import { AppType, ScreensProps } from '../../../types/AppType';
import { IResultApp } from '../../../interfaces';
import { ActivityIndicator, StatusBar, View } from 'react-native';

const Welcome: React.FC<ScreensProps> = ({navigation}) => {
  const [app, setApp] = React.useState<AppType | null>(null);
  const [buttonLabel, setButtonLabel] = React.useState("");
  const [versaoLabel, setVersaoLabel] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(true);
  
  
  React.useEffect(() =>{
    
    const loadData = async () => {
      setIsLoading(true);
      var data: IResultApp = await getApp({slug, applicationkey: 'D47EE5680A60310E960CAA6BB2DA6638C53B5E04EB2F9FCBE6D04A953A1A7584'});
      //console.log( data );
      setApp( data );
      setButtonLabel("Vamos Começar");     
      setVersaoLabel(`Versão ${data.versao}`);

      await AsyncStorage.setItem('appKey', data.id);
      await AsyncStorage.setItem('primaryColor', data.primaryColor);
      await AsyncStorage.setItem('secondColor', data.secondColor);
      await AsyncStorage.setItem('versao', data.versao);

      setIsLoading(false);
    };

    loadData();

  },[]);
  
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={app?.primaryColor} />
      {isLoading &&  <Container style={{backgroundColor: '#000', display: 'flex', justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={30} color="#fff" />
      </Container>}
      {!isLoading && 
      <Container style={{backgroundColor: app?.primaryColor ? app?.primaryColor : '#000'}}>
        <Logo source={{uri: app?.logo}}/>
        <BigText textStyles={{color: app?.secondColor  ?? '#fff', fontSize: 30, fontWeight: '800', marginBottom:20}}>{app?.titulo}</BigText> 
        <RegularText textStyles={{color: app?.secondColor  ?? '#fff', fontSize: 20, fontWeight: '500', marginBottom:20}}>{app?.subtitulo}</RegularText>
        <RegularButton 
          btnStyles={{backgroundColor: app?.secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center'}}
          textStyles={{color: app?.primaryColor, fontSize: 24, fontWeight: '500'}}
          onPress={() => navigation.navigate('Start')}>
              {buttonLabel}
        </RegularButton>
        <RegularText textStyles={{color: app?.secondColor, fontSize: 24, fontWeight: '500', bottom: 0, position: 'absolute', textAlign: 'center', marginBottom:5, alignSelf: 'center'}}>{versaoLabel ?? "" }</RegularText>
      </Container>
      }
    </>   
  );
};

export default Welcome;