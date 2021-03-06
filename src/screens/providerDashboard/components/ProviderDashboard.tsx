import React from "react";
import { ActivityIndicator, View } from "react-native";
import CardSection from "../../../components/Cards/CardSection";
import ScreenHeadUser from "../../../components/Head/ScreenHeadUser";
import Icon from 'react-native-vector-icons/Ionicons';
import BigText from "../../../components/Texts/BigText";
import RegularText from "../../../components/Texts/RegularText";
import { cleanData, useAppData } from "../../../services";
import { ScreensProps, TSchedule, TServices, TUser } from "../../../types/AppType";
import { Container } from "./ProviderDashboard.s";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fetchConsultaPagamentos, fetchData } from "../service";
import AsyncStorage from "@react-native-community/async-storage";
import MessageAlertModal from "../../../components/Modals/MessageAlertModal";
import TransactionSectionProvider from "../../../components/Transaction/TransactionSectionProvider";

const ProviderDashboard: React.FC<ScreensProps> = ({navigation}) => {
    const [name, setName] = React.useState("Usuário");
    const [data, setData] = React.useState<TUser>();

    const [dataSchedule, setDataSchedule] = React.useState<Array<TServices> | null>( []);
    const [dataServices, setDataServices] = React.useState<Array<TServices> | null>( [] );

    const [avatar, setAvar] = React.useState("https://imagens.circuit.inf.br/noAvatar.png");

    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    const [visible, setVisible] = React.useState(false);
    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [messageModal, setMessageModal] = React.useState('');
    const [type, setType] = React.useState("erro");

    const [isLoading, setLoading] = React.useState(false);
    const [temConnection, setTemConnection] = React.useState(false);

    React.useEffect(() =>{
        loadData();
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

        handleCheckPayments();

        var reponse = await fetchData({id: userId,  appid: appKey}); 

        if (reponse){
            const {sucessful, data, message} = reponse;
            if (sucessful){
                setTemConnection(true);
                setAvar(data?.avatar as string);
                await AsyncStorage.setItem("Avatar", data?.avatar as string);
                setData(data);      
                setDataSchedule(data?.servicesAgendados);         
                setDataServices(data?.servicesConcluido);      
                setLoading(false);
            }
        }
        else{
            setTemConnection(false);
            setLoading(false);
            showModal("Segurança", "suas credênciais expiraram, precisamos que você efetue novamente seu login.", "erro");
            cleanData();
        }
    };  
    
    const handleCheckPayments = async () => {
        // consulta pagamento    
        setLoading(true);     
        const {userId, appKey: appId } = await useAppData();    
        const response = await fetchConsultaPagamentos({userId, appId});
        if (response){
            const {sucessful, data: dataP, message} = response;
            if (sucessful){
                //console.log(message);
                if (dataP && dataP.status === "CONCLUIDA"){
                    showModal("Pix", "Obrigado, pagamento confirmado", "success");
                }
            }
            setLoading(false);
        }
        else{
            setLoading(false);
            showModal("Segurança", "suas credênciais expiraram, precisamos que você efetue novamente seu login.", "erro");
            cleanData();
        }  
    }

    const modalButtonHandle = () =>{
        setVisible(false);
        if (!temConnection){
            navigation.reset({
                index: 1,
                routes: [
                  { name: 'SignIn' },
                ],
              });
        }
        else{
            loadData();
        }

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
                userName={name ? name.split(" ")[0] : ""}  
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true} 
                avatar={avatar}
                onPress={() =>
                    !isLoading ? 
                    navigation.reset({
                        index: 1,
                        routes: [
                          { name: 'Menu' },
                        ],
                      }): null }
                />
            <View style={{display: "flex", flexDirection: "row", justifyContent:'space-between',  marginTop: 75}}>
                <BigText textStyles={{color: secondColor, fontSize: 28, fontWeight: '800'}}>Saldo</BigText>  
                <TouchableOpacity onPress={handleCheckPayments}>
                    {isLoading && <ActivityIndicator size={30} color="#fff" />}
                    {!isLoading && <Icon name="sync" color={secondColor} size={30} /> }                    
                </TouchableOpacity>
            </View>           
            <TouchableOpacity onPress={() => navigation.navigate("ProviderTransaction")}>
                <RegularText textStyles={{color: secondColor, fontSize: 28, fontWeight: '400'}}>R$ {data?.amount}</RegularText> 
            </TouchableOpacity>

            <CardSection refreshing={isLoading} onRefresh={loadData}  data={dataSchedule as Array<TServices>} primaryColor={primaryColor} secondColor={secondColor} />

            <TransactionSectionProvider refreshing={isLoading} onRefresh={loadData}  data={dataServices as Array<TServices>} title={"Serviços"} subtitle={"Recentes"} primaryColor={primaryColor} secondColor={secondColor}/>

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