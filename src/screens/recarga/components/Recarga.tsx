import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import { ActivityIndicator, Alert } from "react-native";
import { Masks } from "react-native-mask-input";
import ImageButton from "../../../components/Buttons/ImageButton";
import RegularButton from "../../../components/Buttons/RegularButton";
import ScreenHead from "../../../components/Head/ScreenHead";
import MaskedInput from "../../../components/Input/MaskedInput";
import MessageAlertModal from "../../../components/Modals/MessageAlertModal";
import { Row } from "../../../components/Shared";
import BigText from "../../../components/Texts/BigText";
import { cleanData, useAppData } from "../../../services";
import { ScreensProps } from "../../../types/AppType";
import { fetchRecarregar } from "../services";
import { Container } from "./Recarga.s";

const Recarga: React.FC<ScreensProps> = ({navigation}) =>{
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");
    const [formaPagamento, setFormaPagamento] = React.useState("D");

    const [amountRecarga, setamountRecarga] = React.useState("");

    const [isLoading, setLoading] = React.useState(false);
    const [temInternet, setTemInternet] = React.useState(true);

    const [visible, setVisible] = React.useState(false);
    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [messageModal, setMessageModal] = React.useState('');
    const [type, setType] = React.useState("erro");


    React.useEffect(() =>{
    
        const loadData = async () => {
        const {primaryColor:strPrimaryColor, secondColor: strSecondColor } = await useAppData();

        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 
        };
        
        loadData();

    },[]);

    const handlePayment = () => {

        if (amountRecarga == ""){
            showModal("Valor", "informe o valor desejado, o mínimo é de R$ 30,00.", "erro");
            return false;
        }

        if (parseFloat(amountRecarga) == 0){
            showModal("Valor", "informe o valor desejado, o mínimo é de R$ 30,00.", "erro");
            return false;
        }

        if (parseFloat(amountRecarga) < 30){
            showModal("Valor", "o valor mínimo é de R$ 30,00.", "erro");
            return false;
        }

        return Alert.alert(
            "Recarga",
            "Deseja realmente efetuar nova recarga?",
            [
                // The "Yes" button
                {
                    text: "Sim",
                    onPress: async () => {
                        setLoading(true);
                        const { userId, appKey: appId } = await useAppData();

                        if (formaPagamento === "D"){
                            const response = await fetchRecarregar({userId, appId, valor: amountRecarga});
                            if (response){
                                setTemInternet(true);
                                const {sucessful, data, message} = response;
                                if (sucessful){
                                    //console.log(data.qrcode);
                                    setLoading(false);
                                    
                                    await AsyncStorage.setItem("urlPix", data.qrcode);
                                    await AsyncStorage.setItem("transactionId", data.id);

                                    navigation.navigate("RecargaPagarPix");
                                }
                            }
                            else{
                                setTemInternet(false);
                                setLoading(false);
                                showModal("Segurança", "suas credênciais expiraram, precisamos que você efetue novamente seu login.", "erro");
                                cleanData();
                            }                        
                        }
                        setLoading(false);
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "Não",
                },
            ]
            );        
    }
    const showModal = (headText: string, message: string, type: string)=> {
        setMessageHeadding(headText);
        setMessageModal(message);
        setType(type);
        setVisible(true);
    }

    const modalButtonHandle = () =>{
        setVisible(false);
        if (!temInternet) navigation.navigate("SignIn");
    }

    return (
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                screenName="Recarga"  
                onPress={() => navigation.navigate("Menu")}
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true} />

            <MaskedInput 
                iconeName='currency-usd'
                iconeColor={primaryColor}
                title='Valor'
                placeholder="0,00"
                keyboardType="number-pad"
                mask={Masks.CURRENCY_BRL}  
                value={amountRecarga}
                onChangeText={setamountRecarga}
                placeholderColor={primaryColor}
                titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800', width:'85%'}}
                iconStyles={{borderColor: primaryColor}}
                ViewStyles={{backgroundColor: secondColor}}
            />

            <BigText textStyles={{color: secondColor, fontSize: 18, fontWeight: '800'}} >Forma de Pagamento</BigText>

            {formaPagamento === "D" &&
            <Row>
                <ImageButton 
                    btnStyles={{backgroundColor:  secondColor, width: '45%', borderRadius: 5}}
                    textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                    ImageViewName='attach-money'
                    ImageViewColor={secondColor}
                    ImageViewStyles={{backgroundColor:  primaryColor}}
                    onPress={() => setFormaPagamento("D")}>
                        Pix
                </ImageButton>
                <ImageButton 
                    btnStyles={{backgroundColor:  primaryColor, width: '45%', borderTopWidth: 1,  borderLeftWidth: 1,  borderRightWidth: 1,  borderBottomWidth: 1,  borderColor: secondColor}}
                    textStyles={{color: secondColor, fontSize: 24, fontWeight: '500'}}
                    ImageViewName='payment'
                    ImageViewColor={primaryColor}
                    ImageViewStyles={{backgroundColor:  secondColor}}
                    onPress={() => setFormaPagamento("C")}
                    disabled={true}>
                        Cartão
                </ImageButton>
            </Row> 
            }
            {formaPagamento === "C" &&
            <Row>              
                <ImageButton 
                    btnStyles={{backgroundColor:  primaryColor, width: '45%', borderTopWidth: 1,  borderLeftWidth: 1,  borderRightWidth: 1,  borderBottomWidth: 1,  borderColor: secondColor}}
                    textStyles={{color: secondColor, fontSize: 24, fontWeight: '500'}}
                    ImageViewName='payment'
                    ImageViewColor={primaryColor}
                    ImageViewStyles={{backgroundColor:  secondColor}}
                    onPress={() => setFormaPagamento("D")}>
                        Pix
                </ImageButton>
                <ImageButton 
                    btnStyles={{backgroundColor:  secondColor, width: '45%', borderRadius: 5}}
                    textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                    ImageViewName='attach-money'
                    ImageViewColor={secondColor}
                    ImageViewStyles={{backgroundColor:  primaryColor}}
                    onPress={() => setFormaPagamento("C")}
                    disabled={true}>
                        Cartão
                </ImageButton>
            </Row> 
            }

            {isLoading && <RegularButton 
                        btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 15}}
                        textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                        disabled={true}>
                            <ActivityIndicator size={30} color="#fff" />
                        </RegularButton>}
                
            {!isLoading &&
            <RegularButton            
                    btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 15}}
                    textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                    onPress={handlePayment}>
                    Pagar
            </RegularButton>}

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

export default Recarga;