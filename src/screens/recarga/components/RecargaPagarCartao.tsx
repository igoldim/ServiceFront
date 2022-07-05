import React from "react";
import RegularButton from "../../../components/Buttons/RegularButton";
import ScreenHead from "../../../components/Head/ScreenHead";
import { useAppData } from "../../../services";
import { ScreensProps } from "../../../types/AppType";
import { Container } from "./Recarga.s";
import MessageModal from "../../../components/Modals/MessageModal";
import EnderecoInput from "../../../components/Input/EnderecoInput";
import { View } from "react-native";

const RecargaPagarCartao: React.FC<ScreensProps> = ({navigation}) =>{
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");
    const [visibleMessage, setVisibleMessage] = React.useState(false);
    const [messageModal, setMessageModal] = React.useState(''); //Email Validado com sucesso!
    const [messageType, setMessageType] = React.useState('');
    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [modalButtonText, setmodalButtonText] = React.useState('');     

    React.useEffect(() =>{
    
        const loadData = async () => {
        const {primaryColor:strPrimaryColor, secondColor: strSecondColor } = await useAppData();

        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 
        };
        
        loadData();

    },[]);

    const showModal = (type: string, message: string, headText: string, buttonLabel: string) => {
        setMessageType(type);
        setMessageModal(message);
        setMessageHeadding(headText);
        setmodalButtonText(buttonLabel);
        setVisibleMessage(true);
    }

    const handlePagar = () => {
        setVisibleMessage(false);
        showModal("success", "Obrigado, estamos processando seu pagamento", "Sucesso", "Fechar");
    }
   
    const modalButtonHandle = () =>{
        setVisibleMessage(false);
        navigation.navigate("Menu")
    }

    return (
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                screenName="Pagar Cartão"  
                onPress={() => navigation.navigate("Recarga")}
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true} />

            <EnderecoInput 
                iconeName='calendar'
                iconeColor={primaryColor}
                title='Número do cartão de credito'
                placeholder="0000 0000 0000 0000"
                placeholderColor={primaryColor}
                titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 20, fontWeight: '600', textAlign: 'center', paddingLeft: 0, paddingRight: 0}}
                ViewStyles={{marginTop: 20}}
                iconStyles={{borderColor: primaryColor}}    
            />

            <EnderecoInput 
                title='Nome no cartão'
                placeholder="Igual do cartão"
                placeholderColor={primaryColor}
                titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 20, fontWeight: '600'}}
                ViewStyles={{marginTop: 20}}
                iconStyles={{borderColor: primaryColor}}    
            />
            <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <EnderecoInput 
                    title='Validade'
                    placeholder="00/00"
                    placeholderColor={primaryColor}
                    titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                    inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 20, fontWeight: '600', textAlign: 'center', paddingLeft: 0, paddingRight: 0}}
                    ViewStyles={{marginTop: 20, width:'45%'}}
                    iconStyles={{borderColor: primaryColor}}    
                />

                <EnderecoInput 
                    title='CVC'
                    placeholder="000"
                    placeholderColor={primaryColor}
                    titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                    inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 20, fontWeight: '600', textAlign: 'center', paddingLeft: 0, paddingRight: 0}}
                    ViewStyles={{marginTop: 20, width:'45%'}}
                    iconStyles={{borderColor: primaryColor}}    
                />      
            </View>
            

            <RegularButton 
                btnStyles={{borderColor: primaryColor, borderTopWidth: 1,  borderLeftWidth: 1,  borderRightWidth: 1,  borderBottomWidth: 1 ,backgroundColor: secondColor, marginTop: 30}}
                textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                onPress={handlePagar}>
                    Pagar
            </RegularButton>

            <MessageModal
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                viewStyles={{backgroundColor: secondColor}}
                visible={visibleMessage} 
                heading={messageHeadding} 
                message={messageModal} 
                btnTitle={modalButtonText} 
                type={messageType}
                onPress={modalButtonHandle}
            />
        </Container>
    );
}

export default RecargaPagarCartao;