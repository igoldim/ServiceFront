import React from "react";
import RegularButton from "../../../components/Buttons/RegularButton";
import ScreenHead from "../../../components/Head/ScreenHead";
import { cleanData, useAppData } from "../../../services";
import { ScreensProps } from "../../../types/AppType";
import { Container } from "./Recarga.s";
import QRCode from 'react-native-qrcode-svg';
import RegularText from "../../../components/Texts/RegularText";
import Clipboard from "@react-native-clipboard/clipboard";
import MessageModal from "../../../components/Modals/MessageModal";
import AsyncStorage from "@react-native-community/async-storage";
import { View } from "react-native";
import PixTimer from "../../../components/Timers/PixTimer";
import { fetchConsultaPagamento } from "../services";
import MessageAlertModal from "../../../components/Modals/MessageAlertModal";

const RecargaPagarPix: React.FC<ScreensProps> = ({navigation}) =>{
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");
    const [pixCode, setPixCode] = React.useState("00020126880014br.gov.bcb.pix01361d90ed97-8f3e-4436-9975-6539ef21aeb40226Recarga The Cleaner Amanda52040000530398654041.005802BR5925IGOR A DE OLIVEIRA GOLDIM6009SAO PAULO6205050116304098A");
   
    const [visible, setVisible] = React.useState(false);
    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [messageModal, setMessageModal] = React.useState('');
    const [type, setType] = React.useState("erro");

    React.useEffect(() =>{
    
        const loadData = async () => {
            const {primaryColor:strPrimaryColor, secondColor: strSecondColor } = await useAppData();

            setPrimaryColor(strPrimaryColor); 
            setSecondColor(strSecondColor); 

            var urlPix = await AsyncStorage.getItem("urlPix") as string;
            var transactionId = await AsyncStorage.getItem("transactionId") as string;

            setPixCode(urlPix as string);

            setTimeout(async () =>{
                // consulta pagamento                
                const response = await fetchConsultaPagamento({id: transactionId});
                if (response){
                    const {sucessful, data, message} = response;
                    if (sucessful){
                        console.log(data);
                        if (data.status === "CONCLUIDA"){
                            showModal("Pix", "Obrigado, pagamento confirmado", "success");
                        }
                    }
                }
                else{
                    showModal("Segurança", "suas credênciais expiraram, precisamos que você efetue novamente seu login.", "erro");
                    cleanData();
                }  
            }, 5000);
        };
        
        loadData();

    },[]);

    const showModal = (headText: string, message: string, type: string)=> {
        setMessageHeadding(headText);
        setMessageModal(message);
        setType(type);
        setVisible(true);
    }

    const modalButtonHandle = async () =>{
        setVisible(false);
        const { UserType } = await useAppData();
        if (UserType === "0" ){
            navigation.navigate("TakerDashboard");
        }
        else{
            navigation.navigate("ProviderDashboard");
        }
    }
    const copyToClipboard = () => {
        Clipboard.setString(pixCode);
        setVisible(false);
        showModal("Pix", "Código copiado com sucesso", "success");
    }
   



    return (
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                screenName="Pagar PIX"  
                onPress={() => navigation.navigate("Menu")}
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true} />

            <RegularText textStyles={{fontSize: 24, textAlign: 'center', fontWeight:'800', marginBottom: 30}}>
                Escanei o código abaixo com o aplicativo do seu banco.
            </RegularText>
            <View style={{alignSelf:'center', justifyContent:'center', alignItems:'center', backgroundColor: "#fff", width: 200, height: 200}}>
                <QRCode 
                    size={160}
                    value={pixCode} />
            </View>
            <RegularText textStyles={{fontSize: 14, textAlign: 'center', marginTop: 20}}>
                {pixCode}
            </RegularText>

            <RegularButton 
                btnStyles={{borderColor: primaryColor, borderTopWidth: 1,  borderLeftWidth: 1,  borderRightWidth: 1,  borderBottomWidth: 1 ,backgroundColor: secondColor, marginTop: 25}}
                textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                onPress={copyToClipboard}>
                    Copia e Cola
            </RegularButton>

            <PixTimer textColor= {secondColor}  /> 

            <RegularText textStyles={{fontSize: 18, textAlign: 'center', marginTop: 20}}>
                Observe que os pagamentos com este método podem levar até 24 horas para serem processados. Se ainda não estiver em seu saldo - envie um ticket de suporte.
            </RegularText>

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
}

export default RecargaPagarPix;