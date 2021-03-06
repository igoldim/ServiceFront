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
import { ActivityIndicator } from 'react-native';

const SignIn: React.FC<ScreensProps> = ({navigation}) => {
    const [appId, setAppId] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    const [visible, setVisible] = React.useState(false);
    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [messageModal, setMessageModal] = React.useState('');
    const [type, setType] = React.useState("erro");
    
    const [messageResponse, setMessageResponse] = React.useState('');

    const [sendDocuments, setSendDocuments] = React.useState(false);
    const [userType, setUserType] = React.useState(0);

    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() =>{
      loadData();
    },[]);

    const loadData = async () => {
     
      const {appKey: appId, primaryColor:strPrimaryColor, secondColor: strSecondColor, IsLogado, UserType } = await useAppData();        

      if (IsLogado == "true"){
        if (UserType == "0"){
          navigation.navigate('TakerDashboard');
        }
        else if (UserType == "1"){
            navigation.navigate('ProviderDashboard');
        } 
      }
      setAppId(appId);
      setPrimaryColor(strPrimaryColor); 
      setSecondColor(strSecondColor); 

    };    

    const handleLogin = async () =>{
      try {
          setLoading(true);
          //valida dados de entrada
          if (email === "") {
            setLoading(false);
            showModal("Erro", "Informe seu email", "erro");
            return false;
          }

          if (password === "") {
            setLoading(false);
            showModal("Erro", "Informe sua senha", "erro");
            return false;
          }

          //call backend
          var { sucessful, data, message, token, sendDocuments: boolSendDocuments, userType} = await fetchLogin({appId, email, password});       
          setSendDocuments(boolSendDocuments);
          //console.log(sucessful);
          if (sucessful){
            await AsyncStorage.setItem("userId", data?.id);
            await AsyncStorage.setItem("Name", data?.name);
            await AsyncStorage.setItem("Avatar", data?.avatar ? data!.avatar : "https://imagens.circuit.inf.br/noAvatar.png");
            await AsyncStorage.setItem("token", token?.toString());
            await AsyncStorage.setItem("isLogged", "true");
            await AsyncStorage.setItem("UserType", data?.userType?.toString() as string);

            setUserType(data!.userType as number);
            await AsyncStorage.setItem("Email", email);

            if (data!.userType == 0){
                setLoading(false);
                navigation.reset({
                  index: 1,
                  routes: [
                    { name: 'TakerDashboard' },
                  ],
                });
            }
            else if (data!.userType == 1){
                setLoading(false);
                navigation.reset({
                  index: 1,
                  routes: [
                    { name: 'ProviderDashboard' },
                  ],
                });
            } 
            else{
              setLoading(false);
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
            if (data?.id) await AsyncStorage.setItem("userId", data?.id);
            await AsyncStorage.setItem("Email", email);
            await AsyncStorage.setItem("isLogged", "false");
            
            //console.log(NUserType);
            //console.log(boolSendDocuments);
            setUserType(userType);
            setLoading(false);
            if (userType == 1 &&  boolSendDocuments){
              navigation.reset({
                index: 1,
                routes: [
                  { name: 'ValidandoDocumentos' },
                ],
              });              
              return false;
            }
            else{
              setLoading(false);
              setMessageResponse(message);
              showModal("Erro", message, "erro");
            }
          }
      } catch (error) {
        setLoading(false);
        console.log(error);
      } 
    }

    const showModal = (headText: string, message: string, type: string)=> {
      setMessageHeadding(headText);
      setMessageModal(message);
      setType(type);
      setVisible(true);
    }

    const modalButtonHandle = async () =>{
      if (messageResponse == "Email n??o confirmado, acesse seu email para valid??-lo."){
        navigation.navigate('EmailVerification');
        setVisible(false);
      }
      else if (userType == 1 &&  !sendDocuments){
        await AsyncStorage.setItem("validaDocumento", "true");
        navigation.navigate('Documentos');
        setVisible(false);
      }
      else{
        setVisible(false);
      }    
      //console.log(userType);
    }

    return (
      <Container style={{backgroundColor: primaryColor ? primaryColor : '#000'}}>
        <ScreenHead 
          screenName='Identifica????o' 
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
              inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 20, fontWeight: '800', width:'85%'}}
              iconStyles={{borderColor: primaryColor}}
              ViewStyles={{backgroundColor: secondColor}}
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
              ViewStyles={{backgroundColor: secondColor}}
              isPassword={true}            
              onChangeText={setPassword}
              value={password}
          />      

          {isLoading && <RegularButton 
                        btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 15}}
                        textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                        disabled={true}>
                            <ActivityIndicator size={30} color="#fff" />
                        </RegularButton>}
                
          {!isLoading &&
          <RegularButton            
                  btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 15}}
                  textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                  onPress={handleLogin}>
                  Acessar
          </RegularButton>}

          <MessageAlertModal 
              visible={visible} 
              heading={messageHeadding} 
              message={messageModal} 
              onPress={() => modalButtonHandle()}
              type={type}
              primaryColor={primaryColor}
              secondColor={secondColor}                
            />

      </Container>
    );
};

export default SignIn;