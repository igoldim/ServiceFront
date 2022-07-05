import React from 'react';
import { Container, Line} from './SignUp.s';
import { useAppData } from '../../../services';
import BigText from '../../../components/Texts/BigText';
import RegularButton from '../../../components/Buttons/RegularButton';
import { ScreensProps } from '../../../types/AppType';
import RegularInput from '../../../components/Input/RegularInput';
import ScreenHead from '../../../components/Head/ScreenHead';

const SignUp: React.FC<ScreensProps> = ({navigation}) => {
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    React.useEffect(() =>{
    
    const loadData = async () => {
      const {primaryColor:strPrimaryColor, secondColor: strSecondColor } = await useAppData();
      //const UserType = await AsyncStorage.getItem('UserType');
      //console.log(UserType);
      setPrimaryColor(strPrimaryColor); 
      setSecondColor(strSecondColor); 
    };
    
    loadData();

  },[]);
  
  return (
    <Container style={{backgroundColor: primaryColor}}>
        <ScreenHead 
            screenName='Novo cadastro'
            primaryColor={primaryColor} 
            secondColor={secondColor} 
        />
        <Line/>
        <RegularInput 
            iconeName='account'
            iconeColor={primaryColor}
            title='Nome Completo'
            placeholder="Digite seu nome"
            placeholderColor={primaryColor}
            titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
            inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 20, fontWeight: '800'}}
            ViewStyles={{marginTop: 40}}
            iconStyles={{borderColor: primaryColor}}
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

        <RegularInput 
            iconeName='form-textbox-password'
            iconeColor={primaryColor}
            title='Confirme Senha'
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
            onPress={() => navigation.navigate('EmailVerification')}>
            Gravar
        </RegularButton>

    </Container>
  );
};

export default SignUp;