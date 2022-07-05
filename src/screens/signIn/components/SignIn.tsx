import React from 'react';
import { Container} from './SignIn.s';
import { useAppData } from '../../../services';
import RegularButton from '../../../components/Buttons/RegularButton';
import { ScreensProps } from '../../../types/AppType';
import RegularInput from '../../../components/Input/RegularInput';
import ScreenHead from '../../../components/Head/ScreenHead';
import AsyncStorage from '@react-native-community/async-storage';

const SignIn: React.FC<ScreensProps> = ({navigation}) => {
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");
    const [userType, setUserType] = React.useState<string>("");

    React.useEffect(() =>{
    
    const loadData = async () => {
      const {primaryColor:strPrimaryColor, secondColor: strSecondColor } = await useAppData();
      const UserType = await AsyncStorage.getItem('UserType');
      setUserType(UserType as string);
      //console.log(UserType);
      setPrimaryColor(strPrimaryColor); 
      setSecondColor(strSecondColor); 

    };
    
    loadData();

  },[]);
  
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
        />      

        <RegularButton            
            btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center'}}
            textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
            onPress={() => userType === 'T' ? navigation.navigate('TakerDashboard') : navigation.navigate('ProviderDashboard')}>
            Acessar
        </RegularButton>

    </Container>
  );
};

export default SignIn;