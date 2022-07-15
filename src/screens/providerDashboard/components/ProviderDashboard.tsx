import React from "react";
import { ActivityIndicator, View } from "react-native";
import CardSection from "../../../components/Cards/CardSection";
import ScreenHeadUser from "../../../components/Head/ScreenHeadUser";
import Icon from 'react-native-vector-icons/Ionicons';
import BigText from "../../../components/Texts/BigText";
import RegularText from "../../../components/Texts/RegularText";
import TransactionSection from "../../../components/Transaction/TransactionSection";
import { cleanData, useAppData } from "../../../services";
import { ScreensProps, TUser } from "../../../types/AppType";
import { Container } from "./ProviderDashboard.s";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fetchConsultaPagamentos, fetchData } from "../service";
import CardSectionFake from "../../../components/Cards/CardSectionFake";
import TransactionSectionFake from "../../../components/Transaction/TransactionSectionFake";
import AsyncStorage from "@react-native-community/async-storage";
import MessageAlertModal from "../../../components/Modals/MessageAlertModal";
import { fetchConsultaPagamento } from "../../recarga/services";

const ProviderDashboard: React.FC<ScreensProps> = ({navigation}) => {
    const [name, setName] = React.useState("Usuário");
    const [data, setData] = React.useState<TUser>();
    const [avatar, setAvar] = React.useState("https://imagens.circuit.inf.br/noAvatar.png");

    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    const [visible, setVisible] = React.useState(false);
    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [messageModal, setMessageModal] = React.useState('');
    const [type, setType] = React.useState("erro");

    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() =>{
        loadData();
        handleCheckPayments();
    },[]);

    const loadData = async () => {
        setLoading(true);
        const {primaryColor:strPrimaryColor, secondColor: strSecondColor, Name, userId, appKey, Avatar, IsLogado } = await useAppData();

        //validar todas as telas
        if (IsLogado == null || IsLogado == "false"){
            setLoading(false);
            showModal("Segurança", "suas credênciais expiraram, precisamos que você efetue novamente seu login.", "erro");
            cleanData();
        }    


        setAvar(Avatar);
        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 
        setName(Name);

        var reponse = await fetchData({id: userId,  appid: appKey}); 

        if (reponse){
            const {sucessful, data, message} = reponse;
            if (sucessful){
                setAvar(data?.avatar as string);
                await AsyncStorage.setItem("Avatar", data?.avatar as string);
                setData(data);               
                setLoading(false);
            }
        }
        else{
            setLoading(false);
            showModal("Segurança", "suas credênciais expiraram, precisamos que você efetue novamente seu login.", "erro");
            cleanData();
        }
    };  
    
    const handleCheckPayments = async () => {
        setLoading(true);
        // consulta pagamento         
        const {userId, appKey: appId } = await useAppData();    
        const response = await fetchConsultaPagamentos({userId, appId});
        if (response){
            const {sucessful, data: dataP, message} = response;
            if (sucessful){
                console.log(dataP);
                if (dataP && dataP.status === "CONCLUIDA"){
                    showModal("Pix", "Obrigado, pagamento confirmado", "success");
                }
            }
            loadData();
            setLoading(false);
        }
        else{
            setLoading(false);
            showModal("Segurança", "suas credênciais expiraram, precisamos que você efetue novamente seu login.", "erro");
            cleanData();
        }  
    }

    const showModalScheduling = (item:TUser) =>{

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
            <ScreenHeadUser 
                userName={name.split(" ")[0]} 
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true} 
                avatar={avatar}
                onPress={() => 
                    navigation.reset({
                        index: 1,
                        routes: [
                          { name: 'Menu' },
                        ],
                      })}
                />
            <View style={{display: "flex", flexDirection: "row", justifyContent:'space-between',  marginTop: 75}}>
                <BigText textStyles={{color: secondColor, fontSize: 28, fontWeight: '800'}}>Saldo</BigText>  
                <TouchableOpacity onPress={handleCheckPayments}>
                    {isLoading && <ActivityIndicator size={30} color="#fff" />}
                    {!isLoading && <Icon name="sync" color={secondColor} size={30} /> }                    
                </TouchableOpacity>
            </View>           
            <RegularText textStyles={{color: secondColor, fontSize: 28, fontWeight: '400'}}>R$ {data?.amount}</RegularText> 

            {data?.servicesAgendados.length == 0  && 
                <CardSectionFake primaryColor={primaryColor} secondColor={secondColor} />
            }           

            {data?.servicesAgendados   &&  
                <CardSection data={data?.servicesAgendados} primaryColor={primaryColor} secondColor={secondColor} />
            }


            {data?.servicesConcluido && data?.servicesConcluido.length == 0  && 
                <TransactionSectionFake title={"Serviços"} subtitle={"Recentes"} primaryColor={primaryColor} secondColor={secondColor}/>
            }           

            {data?.servicesConcluido && data?.servicesConcluido.length > 0  && 
                <TransactionSection data={data?.servicesConcluido} title={"Serviços"} subtitle={"Recentes"} primaryColor={primaryColor} secondColor={secondColor}/>
            }           


            <MessageAlertModal 
                visible={visible} 
                heading={messageHeadding} 
                message={messageModal} 
                onPress={modalButtonHandle}
                type={type}
                primaryColor={primaryColor}
                secondColor={secondColor}                
            />

        </Container>);
}

export default ProviderDashboard;