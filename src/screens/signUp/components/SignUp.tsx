import React from 'react';
import { Container, Line} from './SignUp.s';
import { useAppData } from '../../../services';
import RegularButton from '../../../components/Buttons/RegularButton';
import { ScreensProps } from '../../../types/AppType';
import RegularInput from '../../../components/Input/RegularInput';
import ScreenHead from '../../../components/Head/ScreenHead';
import AsyncStorage from '@react-native-community/async-storage';
import { fetchRegister } from '../services';
import GetLocation from 'react-native-get-location' //https://www.npmjs.com/package/react-native-get-location
import MessageAlertModal from '../../../components/Modals/MessageAlertModal';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';

const SignUp: React.FC<ScreensProps> = ({navigation}) => {
  const [appId, setAppId] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [registro, setRegistro] = React.useState<string>("");

  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const [tipo, setTipo] = React.useState(0);
  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");

  const [visible, setVisible] = React.useState(false);
  const [messageHeadding, setMessageHeadding] = React.useState('');
  const [messageModal, setMessageModal] = React.useState('');

  const [messageResponse, setMessageResponse] = React.useState('');

  const [primaryColor, setPrimaryColor] = React.useState("#000");
  const [secondColor, setSecondColor] = React.useState("#000");

  const [type, setType] = React.useState("erro");

  const [isLoading, setLoading] = React.useState(false);

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

      const {primaryColor:strPrimaryColor, secondColor: strSecondColor, Latitude, Longitude, appKey } = await useAppData();
      //const UserType = await AsyncStorage.getItem('UserType');
      //console.log(UserType);
      setAppId(appKey);
      setPrimaryColor(strPrimaryColor); 
      setSecondColor(strSecondColor); 
      setLatitude(Latitude);
      setLongitude(Longitude);

      const UserTypeScreen = await AsyncStorage.getItem('UserTypeScreen');
      setTipo(UserTypeScreen === "T" ? 0 : 1);
      await AsyncStorage.setItem("userType", tipo.toString() as string);

    };
    
    loadData();

  },[]);

  const handleRegister = async () =>{
    try {
        setLoading(true);
        //valida dados de entrada
        if (nome === "") {
          showModal("Erro", "Informe seu nome", "erro");
          return false;
        }

        if (email === "") {
          showModal("Erro", "Informe seu email", "erro");
          return false;
        }

        if (registro === "") {
          showModal("Erro", "Informe seu CPF", "erro");
          return false;
        }

        //validar CPF

        //Consultar CPF na receita federal e na PF/PC

        if (password === "") {
          showModal("Erro", "Informe sua senha", "erro");
          return false;
        }

        if (passwordConfirm === "") {
          showModal("Erro", "Informe sua confirmação de senha", "erro");
          return false;
        }

        if (password != passwordConfirm) {
          showModal("Erro", "Senhas não conferem", "erro");
          return false;
        }

        //call backend
        var { sucessful, data, message } = await fetchRegister({appId, name: nome, email, register: registro, password, tipo, latitude, longitude});       
        //console.log(sucessful);
        if (sucessful){
          await AsyncStorage.setItem("activateCode", data!.activateCode as string);
          await AsyncStorage.setItem("Email", email);
          setMessageResponse(message);
          setLoading(false);
          showModal("Parabéns", message, "success")
        }
        else{
          setMessageResponse(message);
          setLoading(false);
          showModal("Erro", message, "erro");
          await AsyncStorage.setItem("isLogged", "false");
        }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } 
  }

  const showModal = (headText: string, message: string, tipo: string)=> {
    setMessageHeadding(headText);
    setMessageModal(message);
    setType(tipo);
    setVisible(true);
  }

  const modalButtonHandle = () =>{
    if (messageResponse == "Usuário Cadastrado e email de validação enviado com sucesso!"){
      navigation.navigate('EmailVerification');
      setVisible(false);
    }
    else{
      setVisible(false);
    }    
  }

  return (
    <Container style={{backgroundColor: primaryColor}}>
        <ScreenHead 
            screenName='Novo cadastro'
            primaryColor={primaryColor} 
            secondColor={secondColor} 
        />
        <Line/>
        <ScrollView>
          <RegularInput 
              iconeName='account'
              iconeColor={primaryColor}
              title='Nome Completo'
              placeholder="Digite seu nome"
              placeholderColor={primaryColor}
              titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
              inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800', width:'85%'}}
              ViewStyles={{backgroundColor: secondColor}}
              iconStyles={{borderColor: primaryColor}}
              onChangeText={setNome}
              value={nome}
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
              inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800', width:'85%'}}
              iconStyles={{borderColor: primaryColor}}
              ViewStyles={{backgroundColor: secondColor}}
              onChangeText={setEmail}
              value={email}
          />
          <RegularInput 
                    iconeName='card-account-details'
                    iconeColor={primaryColor}
                    title='CPF'
                    placeholder="Digite seu cpf"
                    keyboardType="number-pad"
                    maxLength={11}
                    placeholderColor={primaryColor}
                    titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                    inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800', width:'85%'}}
                    iconStyles={{borderColor: primaryColor}}
                    ViewStyles={{backgroundColor: secondColor}}
                    value={registro}
                    onChangeText={setRegistro}
                />

          <RegularInput 
              iconeName='form-textbox-password'
              iconeColor={primaryColor}
              title='Senha'
              placeholder="* * * * * *"
              placeholderColor={primaryColor}
              titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
              inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800'}}
              iconStyles={{borderColor: primaryColor}}
              ViewStyles={{backgroundColor: secondColor}}
              isPassword={true}            
              onChangeText={setPassword}
              value={password}
          />

          <RegularInput 
              iconeName='form-textbox-password'
              iconeColor={primaryColor}
              title='Confirme Senha'
              placeholder="* * * * * *"
              placeholderColor={primaryColor}
              titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
              inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800'}}
              iconStyles={{borderColor: primaryColor}}
              ViewStyles={{backgroundColor: secondColor}}
              isPassword={true}            
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
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
                  onPress={handleRegister}>
                  Gravar
          </RegularButton>}

          <MessageAlertModal 
                  visible={visible} 
                  heading={messageHeadding} 
                  message={messageModal} 
                  type={type}
                  onPress={modalButtonHandle}
                  primaryColor={primaryColor}
                  secondColor={secondColor}                
          />
        </ScrollView>
    </Container>
  );
};

export default SignUp;