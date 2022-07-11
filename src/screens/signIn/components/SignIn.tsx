import React from 'react';
import { Container} from './SignIn.s';
import { useAppData } from '../../../services';
import RegularButton from '../../../components/Buttons/RegularButton';
import { ScreensProps } from '../../../types/AppType';
import RegularInput from '../../../components/Input/RegularInput';
import ScreenHead from '../../../components/Head/ScreenHead';
import AsyncStorage from '@react-native-community/async-storage';
import { fetchLogin } from '../services';
import MessageAlertModal from '../../../components/Modals/MessageAlertModal';

const SignIn: React.FC<ScreensProps> = ({navigation}) => {
    const [appId, setAppId] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    const [visible, setVisible] = React.useState(false);
    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [messageModal, setMessageModal] = React.useState('');

    const [messageResponse, setMessageResponse] = React.useState('');

    const [type, setType] = React.useState("erro");
    

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

        //valida dados de entrada
        if (email === "") {
          showModal("Erro", "Informe seu email", "erro");
          return false;
        }

        if (password === "") {
          showModal("Erro", "Informe sua senha", "erro");
          return false;
        }
        

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
          await AsyncStorage.setItem("Email", email);
            
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
            await AsyncStorage.removeItem("email");
            await AsyncStorage.setItem("isLogged", "false");
          }
        }
        else{
          await AsyncStorage.setItem("Email", email);
          await AsyncStorage.setItem("isLogged", "false");
          await AsyncStorage.setItem("validaDocumento", "true");
          
          setMessageResponse(message);
          
          showModal("Erro", message, "erro");
        }
    } catch (error) {
      console.log(error);
    } 
  }

  const showModal = (headText: string, message: string, type: string)=> {
    setMessageHeadding(headText);
    setMessageModal(message);
    setType(type);
    setVisible(true);
  }


  const modalButtonHandle = () =>{
    if (messageResponse == "Email não confirmado, acesse seu email para validá-lo."){
      navigation.navigate('EmailVerification');
      setVisible(false);
    }
    else if (messageResponse == "Você precisa informar seus documentos para validação de sua conta"){
      navigation.navigate('Documentos');
      setVisible(false);
    }
    else{
      setVisible(false);
    }    
    console.log(messageResponse);
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
            autoCapitalize='none'
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

        <MessageAlertModal 
                visible={visible} 
                heading={messageHeadding} 
                message={messageModal} 
                onPress={modalButtonHandle}
                type={type}
                primaryColor={primaryColor}
                secondColor={secondColor}                
                />

    </Container>
  );
};

export default SignIn;