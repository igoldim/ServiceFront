import React from "react";
import { Container } from "./Start.s";
import RegularButton from "../../../components/Buttons/RegularButton";
import BigText from "../../../components/Texts/BigText";
import RegularText from "../../../components/Texts/RegularText";
import { useAppData } from "../../../services";
import { ScreensProps } from "../../../types/AppType";
import AsyncStorage from "@react-native-community/async-storage";
import { StatusBar } from "react-native";

const Start: React.FC<ScreensProps> = ({navigation}) => {
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

        const {primaryColor:strPrimaryColor, secondColor: strSecondColor } = await useAppData();

        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 
    };
    
    loadData();

  },[]);

  const handleType = async (type : string) =>{

    await AsyncStorage.setItem('UserTypeScreen', type);

    type === 'T' ? navigation.navigate('StartTaker'): navigation.navigate('StartProvider');
  }

    return (
        <Container style={{backgroundColor: primaryColor}}>
            <StatusBar barStyle="light-content" backgroundColor={primaryColor} />
            <BigText textStyles={{color: secondColor, textAlign: "center", marginTop: 33, marginBottom: 45, fontWeight: '800'}}>Vamos Começar</BigText>
            
            <RegularText textStyles={{color: secondColor, textAlign: "center", marginBottom: 50}}>Escolha um perfil</RegularText>

            <RegularButton 
                btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center', marginBottom: 50}}
                textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                onPress={() => handleType('T')}>
                    Sou tomador de serviços
            </RegularButton>

            <RegularButton 
                btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center'}}
                textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                onPress={() => handleType('P')}>
                    Sou prestador de serviços
            </RegularButton>
            
            <BigText textStyles={{color: secondColor, marginTop: 33, marginBottom: 10, fontSize: 24, fontWeight: '800'}}>
                Tomador
            </BigText>
            
            <RegularText textStyles={{color: secondColor, marginBottom: 10}}>
                O tomador de serviço é quem contrata o prestador de serviço, usuários em geral.
            </RegularText>

            <BigText textStyles={{color: secondColor, marginTop: 33, marginBottom: 10, fontSize: 24, fontWeight: '800'}}>
                Prestador
            </BigText>
            
            <RegularText textStyles={{color: secondColor, marginBottom: 50}}>
                O prestador de serviço é quem realiza o serviço ao tomador, diáristas.
            </RegularText>

        </Container>
    );
};

export default Start;