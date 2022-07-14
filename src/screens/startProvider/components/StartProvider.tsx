import React from "react";
import { Container, StyledView } from "./StartProvider.s";
import RegularButton from "../../../components/Buttons/RegularButton";
import BigText from "../../../components/Texts/BigText";
import RegularText from "../../../components/Texts/RegularText";
import { cleanData, useAppData } from "../../../services";
import { ScreensProps } from "../../../types/AppType";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar, Text, View } from "react-native";
import MessageAlertModal from "../../../components/Modals/MessageAlertModal";

const StartProvider: React.FC<ScreensProps> = ({navigation}) => {
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    const [visible, setVisible] = React.useState(false);
    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [messageModal, setMessageModal] = React.useState('');
    const [type, setType] = React.useState("erro");

    React.useEffect(() =>{
        loadData();
    },[]);
    
  const loadData = async () => {
        const {primaryColor:strPrimaryColor, secondColor: strSecondColor, IsLogado } = await useAppData();
        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 

        //validar todas as telas
        if (IsLogado == null || IsLogado == "false"){
            showModal("Segurança", "suas credênciais expiraram, precisamos que você efetue novamente seu login.", "erro");
            cleanData();
        }    
  };

  const modalButtonHandle = () =>{
    setVisible(false);
    navigation.navigate("SignIn");
  }

  const showModal = (headText: string, message: string, type: string)=> {
        setMessageHeadding(headText);
        setMessageModal(message);
        setType(type);
        setVisible(true);
  }

return (
        <Container style={{backgroundColor: primaryColor}}>
            <StatusBar barStyle="light-content" backgroundColor={primaryColor} />
            <BigText textStyles={{color: secondColor, textAlign: "center", marginTop: 33, marginBottom: 45}}>
                Bem vindo(a) profissional.
            </BigText>
            
            <RegularText textStyles={{color: secondColor, marginBottom: 10}}>
                É muito bom ter você aqui, vamos dar início ao seu cadastramento.
            </RegularText>

            <RegularText textStyles={{color: secondColor, marginBottom: 10}}>
                Iremos conduzir você através de um passo a passo simples e intuitivo, onde você preencherá os dados necessários para ser aceito em nossa plataforma.
            </RegularText>

            <RegularText textStyles={{color: secondColor, marginBottom: 10}}>
                Antes de inciarmos, você deve ler nosso <Text style={{fontWeight: '800'}} >termo de compromisso</Text> e nossa <Text style={{fontWeight: '800'}} >politica de privacidade</Text>, links abaixo.
            </RegularText> 

            <RegularText textStyles={{color: secondColor, marginBottom: 10}}>
                Para iniciar, basta clicar no botão abaixo
            </RegularText>

            <RegularButton 
                btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center', marginBottom: 20}}
                textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                onPress={() => navigation.navigate('SignUp')}>
                    Iniciar cadastro
            </RegularButton>

            <RegularText textStyles={{color: secondColor, marginBottom: 10}}>
                Ou se já possuir cadastro, basta clicar no botão abaixo.
            </RegularText>

            <RegularButton 
                btnStyles={{borderColor: secondColor, borderTopWidth: 1,  borderLeftWidth: 1,  borderRightWidth: 1,  borderBottomWidth: 1, backgroundColor: primaryColor, marginBottom:10, paddingTop: 10}}
                textStyles={{color: secondColor, fontSize: 24, fontWeight: '500'}}
                onPress={() => navigation.navigate('SignIn')}>
                    Entrar
            </RegularButton>

            <StyledView>
                <TouchableOpacity style={{display: 'flex', marginBottom: 10}}> 
                    <RegularText textStyles={{color: secondColor, fontSize: 16, fontWeight: '800'}}>
                        Termo de compromisso
                    </RegularText> 
                </TouchableOpacity> 
                <TouchableOpacity style={{display: 'flex'}}> 
                    <RegularText textStyles={{color: secondColor, fontSize: 16, fontWeight: '800'}}>
                        Politica de privacidade
                    </RegularText> 
                </TouchableOpacity> 
            </StyledView>

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

export default StartProvider;