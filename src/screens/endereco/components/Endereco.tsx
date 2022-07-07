import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import { ScrollView, View } from "react-native";
import RegularButton from "../../../components/Buttons/RegularButton";
import ScreenHead from "../../../components/Head/ScreenHead";
import EnderecoInput from "../../../components/Input/EnderecoInput";
import { useAppData } from "../../../services";
import { ScreensProps } from "../../../types/AppType";
import { Container } from "./Endereco.s";

const Endereco: React.FC<ScreensProps> = ({navigation}) =>{
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
    };
    
    loadData();

  },[]);

    return(
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                screenName="Endereço" 
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true} 
                onPress={() => navigation.navigate("Perfil")} />
            <ScrollView>
                <EnderecoInput 
                    iconeName='my-location'
                    iconeColor={primaryColor}
                    title='Cep'
                    placeholder="Digite seu cep"
                    maxLength={8}
                    keyboardType={"number-pad"}
                    placeholderColor={primaryColor}
                    titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                    inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800'}}
                    ViewStyles={{marginTop: 10}}
                    iconStyles={{borderColor: primaryColor}}
                    ShowMenu={true}
                />
                <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <EnderecoInput 
                        iconeColor={primaryColor}
                        title='Rua'
                        placeholder="Digite nome da rua"
                        placeholderColor={primaryColor}
                        titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                        inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800', paddingRight: 10}}
                        ViewStyles={{marginTop: 10, width:'75%'}}
                        iconStyles={{borderColor: primaryColor}}
                        ShowMenu={false}
                    />

                    <EnderecoInput 
                        iconeColor={primaryColor}
                        title='Número'
                        placeholder="Nº"
                        placeholderColor={primaryColor}
                        titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                        inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800', paddingRight: 10}}
                        ViewStyles={{marginTop: 10, width:'24%'}}
                        iconStyles={{borderColor: primaryColor}}
                        ShowMenu={false}
                    />
                </View>
                <EnderecoInput 
                        iconeColor={primaryColor}
                        title='Bairro'
                        placeholder="Digite nome do bairro"
                        placeholderColor={primaryColor}
                        titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                        inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800', paddingRight: 10}}
                        ViewStyles={{marginTop: 10}}
                        iconStyles={{borderColor: primaryColor}}
                        ShowMenu={false}
                    />
                <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <EnderecoInput 
                        iconeColor={primaryColor}
                        title='Cidade'
                        placeholder="Digite nome da cidade"
                        placeholderColor={primaryColor}
                        titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                        inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800', paddingRight: 10}}
                        ViewStyles={{marginTop: 10, width:'75%'}}
                        iconStyles={{borderColor: primaryColor}}
                        ShowMenu={false}
                    />

                    <EnderecoInput 
                        iconeColor={primaryColor}
                        title='UF'
                        placeholder="UF"
                        maxLength={2}
                        placeholderColor={primaryColor}
                        titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                        inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800', paddingRight: 10}}
                        ViewStyles={{marginTop: 10, width:'24%'}}
                        iconStyles={{borderColor: primaryColor}}
                        ShowMenu={false}
                    />
                </View>
                <EnderecoInput 
                        iconeColor={primaryColor}
                        title='Complemento'
                        placeholder="Digite aqui o complemento"
                        placeholderColor={primaryColor}
                        titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                        inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800', paddingRight: 10}}
                        ViewStyles={{marginTop: 10, marginBottom:20}}
                        iconStyles={{borderColor: primaryColor}}
                        ShowMenu={false}
                    />
                 <RegularButton            
                    btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center'}}
                    textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                    onPress={() => {}}>
                    Gravar
                </RegularButton>
            </ScrollView>
        </Container>
    );
};

export default Endereco;