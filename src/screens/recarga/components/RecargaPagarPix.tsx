import React from "react";
import RegularButton from "../../../components/Buttons/RegularButton";
import ScreenHead from "../../../components/Head/ScreenHead";
import { useAppData } from "../../../services";
import { ScreensProps } from "../../../types/AppType";
import { Container } from "./Recarga.s";
import QRCode from 'react-native-qrcode-svg';
import RegularText from "../../../components/Texts/RegularText";
import { Alert, ToastAndroid, View } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import MessageModal from "../../../components/Modals/MessageModal";

const RecargaPagarPix: React.FC<ScreensProps> = ({navigation}) =>{
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");
    const [pixCode, setPixCode] = React.useState("00020126880014br.gov.bcb.pix01361d90ed97-8f3e-4436-9975-6539ef21aeb40226Recarga The Cleaner Amanda52040000530398654041.005802BR5925IGOR A DE OLIVEIRA GOLDIM6009SAO PAULO6205050116304098A");
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

    const copyToClipboard = () => {
        Clipboard.setString(pixCode);
        setVisibleMessage(false);
        showModal("success", "Código copiado com sucesso", "Sucesso", "Fechar");
    }
   
    const modalButtonHandle = () =>{
        setVisibleMessage(false);
        navigation.navigate("Menu")
    }

    return (
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                screenName="Pagar PIX"  
                onPress={() => navigation.navigate("Recarga")}
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true} />

            <RegularText textStyles={{fontSize: 24, textAlign: 'center', fontWeight:'800', marginBottom: 30}}>
                Escanei o código abaixo com o aplicativo do seu banco.
            </RegularText>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <QRCode 
                    size={160}
                    value={pixCode} />
            </View>
            <RegularText textStyles={{fontSize: 14, textAlign: 'center', marginTop: 30}}>
                {pixCode}
            </RegularText>

            <RegularButton 
                btnStyles={{borderColor: primaryColor, borderTopWidth: 1,  borderLeftWidth: 1,  borderRightWidth: 1,  borderBottomWidth: 1 ,backgroundColor: secondColor, marginTop: 30}}
                textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                onPress={copyToClipboard}>
                    Copia e Cola
            </RegularButton>

            <RegularText textStyles={{fontSize: 18, textAlign: 'center', marginTop: 30}}>
                Observe que os pagamentos com este método podem levar até 24 horas para serem processados. Se ainda não estiver em seu saldo - envie um ticket de suporte.
            </RegularText>

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

export default RecargaPagarPix;