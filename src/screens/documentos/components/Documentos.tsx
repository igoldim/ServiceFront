import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import RegularButton from "../../../components/Buttons/RegularButton";
import ScreenHead from "../../../components/Head/ScreenHead";
import EnderecoInput from "../../../components/Input/EnderecoInput";
import { Container, StyledScrollView } from "../../../components/Shared";
import { useAppData } from "../../../services";
import { ScreensProps } from "../../../types/AppType";

const Documentos: React.FC<ScreensProps> = ({navigation}) =>{
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");
    const [identidadeStatus, setIdentidadeStatus] = React.useState(false);
    const [enderecoStatus, setEnderecoStatus] = React.useState(false);
    const [antecendeteCriminalStatus, setAntecendeteCriminalStatus] = React.useState(false);
    const [setfilStatus, setSelfieStatus] = React.useState(false);
    const [validaDocumento, setValidaDocumento] = React.useState("false");


    React.useEffect(() =>{
    
        const loadData = async () => {
        const {primaryColor:strPrimaryColor, secondColor: strSecondColor } = await useAppData();
        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 

        const validaDocumento = await AsyncStorage.getItem("validaDocumento");
        setValidaDocumento(validaDocumento ? validaDocumento: "false");

        };
        
        loadData();

    },[]);


    return (
        <Container style={{backgroundColor: primaryColor}}>
             <ScreenHead 
                screenName="Documentação"  
                onPress={() => validaDocumento != "true" ? navigation.navigate("Perfil") : navigation.navigate("SignIn")}
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true}/>
             <StyledScrollView>

             <EnderecoInput 
                    iconeName={identidadeStatus ? "check-circle" : "radio-button-unchecked"}
                    iconeColor={primaryColor}
                    title='Comprovante Identidade'
                    placeholder= {identidadeStatus ? "uploaded" : "no uploaded"} 
                    editable={false}             
                    placeholderColor={primaryColor}
                    titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                    inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800'}}
                    ViewStyles={{marginTop: 10}}
                    iconStyles={{borderColor: primaryColor}}
                    ShowMenu={true}
                />
                
                <EnderecoInput 
                    iconeName={enderecoStatus ? "check-circle" : "radio-button-unchecked"}
                    iconeColor={primaryColor}
                    title='Comprovante Endereço'
                    placeholder= {enderecoStatus ? "uploaded" : "no uploaded"} 
                    editable={false}             
                    placeholderColor={primaryColor}
                    titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                    inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800'}}
                    ViewStyles={{marginTop: 10}}
                    iconStyles={{borderColor: primaryColor}}
                    ShowMenu={true}
                />

                <EnderecoInput 
                    iconeName={antecendeteCriminalStatus ? "check-circle" : "radio-button-unchecked"}
                    iconeColor={primaryColor}
                    title='Antecendente Criminal'
                    placeholder= {antecendeteCriminalStatus ? "uploaded" : "no uploaded"} 
                    editable={false}             
                    placeholderColor={primaryColor}
                    titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                    inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800'}}
                    ViewStyles={{marginTop: 10}}
                    iconStyles={{borderColor: primaryColor}}
                    ShowMenu={true}
                />
                <EnderecoInput 
                    iconeName={setfilStatus ? "check-circle" : "radio-button-unchecked"}
                    iconeColor={primaryColor}
                    title='Self com Doc. de Identidade'
                    placeholder= {setfilStatus ? "uploaded" : "no uploaded"} 
                    editable={false}             
                    placeholderColor={primaryColor}
                    titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                    inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800'}}
                    ViewStyles={{marginTop: 10}}
                    iconStyles={{borderColor: primaryColor}}
                    ShowMenu={true}
                />

                <RegularButton            
                        btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 15}}
                        textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                        onPress={() => {}}>
                        Enviar
                </RegularButton>
             </StyledScrollView>
            

        </Container>
    );
}

export default Documentos;