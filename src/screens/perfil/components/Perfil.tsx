import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import { Image } from "react-native";
import RegularButton from "../../../components/Buttons/RegularButton";
import ScreenHead from "../../../components/Head/ScreenHead";
import RegularInput from "../../../components/Input/RegularInput";
import { StyledScrollView } from "../../../components/Shared";
import { useAppData } from "../../../services";
import { ScreensProps } from "../../../types/AppType";
import { Container, IconImg } from "./Perfil.s";

const Perfil: React.FC<ScreensProps> = ({navigation}) =>{
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");
    const [userType, setUserType] = React.useState<string>("");

    React.useEffect(() =>{
    
    const loadData = async () => {
      const {primaryColor:strPrimaryColor, secondColor: strSecondColor } = await useAppData();
      const UserType = await AsyncStorage.getItem('UserType');
      setUserType(UserType as string);
      setPrimaryColor(strPrimaryColor); 
      setSecondColor(strSecondColor); 

      //carrega dados da api
    };
    
    loadData();
  },[]);

    return(
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                screenName="Perfil" 
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true} 
                onPress={() => navigation.navigate("Menu")} />
            <StyledScrollView>
                <IconImg style={{backgroundColor: secondColor, marginTop: 10}} onPress={() => {}}>
                        <Image source={{uri: 'https://imagens.circuit.inf.br/noAvatar.png', width: 100, height:100}}/>
                </IconImg>
                <RegularInput 
                    iconeName='account'
                    iconeColor={primaryColor}
                    title='Nome Completo'
                    placeholder="Digite seu nome"
                    placeholderColor={primaryColor}
                    titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                    inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800'}}
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
                    inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800'}}
                    iconStyles={{borderColor: primaryColor}}
                />
                <RegularInput 
                    iconeName='google-maps'
                    iconeColor={primaryColor}
                    title='Endereço'
                    placeholder="Informe seu endereço"
                    ShowMenu={true}      
                    editable={false}              
                    onPressMenu={() => navigation.navigate("Endereco")}
                    placeholderColor={primaryColor}
                    titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                    inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800'}}
                    iconStyles={{borderColor: primaryColor}}
                />

                {userType === "P" &&
                <>
                    <RegularInput 
                        iconeName='currency-usd'
                        iconeColor={primaryColor}
                        title='Valor'
                        placeholder="0,00"
                        keyboardType="number-pad"
                        placeholderColor={primaryColor}
                        titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                        inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800'}}
                        iconStyles={{borderColor: primaryColor}}
                    />

                    <RegularInput 
                        iconeName='text-box'
                        iconeColor={primaryColor}
                        title='Situação Cadastral'
                        placeholder="Avaliando documentação..."
                        ShowMenu={true}      
                        editable={false}              
                        onPressMenu={() =>navigation.navigate("Documentos")}
                        placeholderColor={primaryColor}
                        titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                        inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800'}}
                        iconStyles={{borderColor: primaryColor}}
                    />
                </>
                }
                <RegularButton            
                    btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center'}}
                    textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                    onPress={() => {}}>
                    Gravar
                </RegularButton>
            </StyledScrollView>
        </Container>
    );
};

export default Perfil;