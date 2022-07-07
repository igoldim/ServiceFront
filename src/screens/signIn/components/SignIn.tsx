import React from 'react';
import { Container} from './SignIn.s';
import { useAppData } from '../../../services';
import RegularButton from '../../../components/Buttons/RegularButton';
import { ScreensProps } from '../../../types/AppType';
import RegularInput from '../../../components/Input/RegularInput';
import ScreenHead from '../../../components/Head/ScreenHead';
import AsyncStorage from '@react-native-community/async-storage';
import { fetchLogin } from '../services';

const SignIn: React.FC<ScreensProps> = ({navigation}) => {
    const [appId, setAppId] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    React.useEffect(() =>{
    
      const loadData = async () => {
        var isLogado = await AsyncStorage.getItem("isLogged");
        var userType = await AsyncStorage.getItem("userType");
        
        if (isLogado == "true"){
          if (userType == "0"){
            navigation.navigate('TakerDashboard');
          }
          else if (userType == "1"){
              navigation.navigate('ProviderDashboard');
          } 
        }
        
        const {appKey: appId, primaryColor:strPrimaryColor, secondColor: strSecondColor } = await useAppData();
        setAppId(appId);
        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 

      };
      
      loadData();

    },[]);

  const handleLogin = async () =>{
    try {
        //call backend
        var { sucessful, data, message, token } = await fetchLogin({appId, email, password});       
        
        //console.log(sucessful);

        if (sucessful){
          await AsyncStorage.setItem("userId", data!.id);
          await AsyncStorage.setItem("Name", data!.name);
          await AsyncStorage.setItem("Avatar", data!.avatar ? data!.avatar : "https://imagens.circuit.inf.br/noAvatar.png");
          await AsyncStorage.setItem("token", token!.toString());
          await AsyncStorage.setItem("isLogged", "true");
          await AsyncStorage.setItem("userType", data!.userType?.toString() as string);
            
          //console.log(data!.userType?.toString());

          if (data!.userType == 0){
              navigation.navigate('TakerDashboard');
          }
          else if (data!.userType == 1){
              navigation.navigate('ProviderDashboard');
          } 
          else{
            await AsyncStorage.removeItem("userId");
            await AsyncStorage.removeItem("Name");
            await AsyncStorage.removeItem("Avatar");
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("userType");
            await AsyncStorage.setItem("isLogged", "false");
          }
        }
        else{
            //console.log(message);
            await AsyncStorage.setItem("isLogged", "false");
        }
    } catch (error) {
      console.log(error);
    } 
}

  
  return (
    <Container style={{backgroundColor: primaryColor ? primaryColor : '#000'}}>
       <ScreenHead 
        screenName='Identificação' 
        primaryColor={primaryColor} 
        secondColor={secondColor} 
        />
        <RegularInput 
            iconeName='email'
            iconeColor={primaryColor}
            title='E-mail'
            keyboardType='email-address'
            placeholder="Digite seu email"
            placeholderColor={primaryColor}
            titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
            inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 20, fontWeight: '800'}}
            iconStyles={{borderColor: primaryColor}}
            ViewStyles={{marginTop: 50}}
            onChangeText={setEmail}
            value={email}
        />
        <RegularInput 
            iconeName='form-textbox-password'
            iconeColor={primaryColor}
            title='Senha'
            placeholder="* * * * * *"
            placeholderColor={primaryColor}
            titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
            inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 20, fontWeight: '800'}}
            iconStyles={{borderColor: primaryColor}}
            isPassword={true}            
            onChangeText={setPassword}
            value={password}
        />      

        <RegularButton            
            btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center'}}
            textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
            onPress={handleLogin}>
            Acessar
        </RegularButton>

    </Container>
  );
};

export default SignIn;