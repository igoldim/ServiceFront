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
import GetLocation from 'react-native-get-location' //https://www.npmjs.com/package/react-native-get-location

const Welcome: React.FC<ScreensProps> = ({navigation}) => {
  const [app, setApp] = React.useState<AppType | null>(null);
  const [buttonLabel, setButtonLabel] = React.useState("");
  const [versaoLabel, setVersaoLabel] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(true);
  
  
  React.useEffect(() =>{
    const loadData = async () => {
      setIsLoading(true);
     
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
      .then(location =>  {
        AsyncStorage.setItem('latitude', `${location.latitude}`);
        AsyncStorage.setItem('longitude', `${location.longitude}`);
        //console.log(location);
      })
      .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
      });

      var data: IResultApp = await getApp({slug, applicationkey: 'D47EE5680A60310E960CAA6BB2DA6638C53B5E04EB2F9FCBE6D04A953A1A7584'});
      //console.log( data );
      setApp( data );
      setButtonLabel("Vamos Começar");     
      setVersaoLabel(`Versão ${data.versao}`);

      await AsyncStorage.setItem('appKey', data.id);
      await AsyncStorage.setItem('primaryColor', data.primaryColor);
      await AsyncStorage.setItem('secondColor', data.secondColor);
      await AsyncStorage.setItem('versao', data.versao);
      var isLogado = await AsyncStorage.getItem("isLogged");
      var userType = await AsyncStorage.getItem("userType");
      
      setIsLoading(false);

      if (isLogado == "true"){
        if (userType == "0"){
          navigation.navigate('TakerDashboard');
        }
        else if (userType == "1"){
            navigation.navigate('ProviderDashboard');
        } 
      }

    };

    loadData();   

  },[]);
 
  
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={app?.primaryColor} />
      <Container style={{backgroundColor: app?.primaryColor ? app?.primaryColor : '#000'}}>
        <Logo source={{uri: app?.logo}}/>
        <BigText textStyles={{color: app?.secondColor  ?? '#fff', fontSize: 30, fontWeight: '800', marginBottom:20}}>{app?.titulo}</BigText> 
        <RegularText textStyles={{color: app?.secondColor  ?? '#fff', fontSize: 20, fontWeight: '500', marginBottom:20}}>{app?.subtitulo}</RegularText>


        {!isLoading && <RegularButton 
          btnStyles={{backgroundColor: app?.secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center'}}
          textStyles={{color: app?.primaryColor, fontSize: 24, fontWeight: '500'}}
          onPress={() => navigation.navigate('Start')}>
              {buttonLabel}
        </RegularButton>}

        {isLoading && <RegularButton 
          btnStyles={{backgroundColor: app?.secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center'}}
          textStyles={{color: app?.primaryColor, fontSize: 24, fontWeight: '500'}}
          disabled={true}>
              <ActivityIndicator size={30} color="#fff" />
        </RegularButton>}


        <RegularText textStyles={{color: app?.secondColor, fontSize: 24, fontWeight: '500', bottom: 0, position: 'absolute', textAlign: 'center', marginBottom:5, alignSelf: 'center'}}>{versaoLabel ?? "" }</RegularText>
      </Container>
    </>   
  );
};

export default Welcome;