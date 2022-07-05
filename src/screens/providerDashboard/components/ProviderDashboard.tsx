import React from "react";
import { View } from "react-native";
import CardSection from "../../../components/Cards/CardSection";
import ScreenHeadUser from "../../../components/Head/ScreenHeadUser";
import Icon from 'react-native-vector-icons/Ionicons';
import BigText from "../../../components/Texts/BigText";
import RegularText from "../../../components/Texts/RegularText";
import TransactionSection from "../../../components/Transaction/TransactionSection";
import { useAppData } from "../../../services";
import { ScreensProps, Users } from "../../../types/AppType";
import { Container } from "./ProviderDashboard.s";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProviderDashboard: React.FC<ScreensProps> = ({navigation}) => {
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    React.useEffect(() =>{
    
        const loadData = async () => {
            const {primaryColor:strPrimaryColor, secondColor: strSecondColor } = await useAppData();
            setPrimaryColor(strPrimaryColor); 
            setSecondColor(strSecondColor); 
        };
        
        loadData();

    },[]);

    const cardData : Array<Users> = [
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af097",
            userName: "Igor Goldim",
            userAddress: "Rua Gabriel Junqueira, 00",
            userAddressDistrict: "Serra Dourada 3 Etapa",
            userAddressCity: "Aparecida de Goiania",
            userAddressState: "GO",
            userAddressComplement: "QD 55 LT 22 Casa 01",
            scheduleDate: "07/05/2022", // ==> pegar dia da semana (Sabádo)
            scheduleTime: "08:00",
            amount: "100,00",
            userImage: 'https://imagens.circuit.inf.br/noAvatar.png',
            stars: 3,
            type: "T",
        },
        {
            id: "2cb32ade-ac5d-50b5-bf25-b135c85af097",
            userName: "Igor Goldim",
            userAddress: "Rua Gabriel Junqueira, 00",
            userAddressDistrict: "Serra Dourada 3 Etapa",
            userAddressCity: "Aparecida de Goiania",
            userAddressState: "GO",
            userAddressComplement: "QD 55 LT 22 Casa 01",
            scheduleDate: "08/05/2022", // ==> pegar dia da semana (Sabádo)
            scheduleTime: "08:00",
            amount: "90,00",
            userImage: 'https://imagens.circuit.inf.br/noAvatar.png',
            stars: 3,
            type: "T",
        },
        {
            id: "2cb32ade-ac5d-50b5-bf25-sdcdc85af097",
            userName: "Igor Goldim",
            userAddress: "Rua Gabriel Junqueira, 00",
            userAddressDistrict: "Serra Dourada 3 Etapa",
            userAddressCity: "Aparecida de Goiania",
            userAddressState: "GO",
            userAddressComplement: "QD 55 LT 22 Casa 01",
            scheduleDate: "08/05/2022", // ==> pegar dia da semana (Sabádo)
            scheduleTime: "08:00",
            amount: "90,00",
            userImage: 'https://imagens.circuit.inf.br/noAvatar.png',
            stars: 5,
            type: "T",
        },
    ];

    const showModalScheduling = (item:Users) =>{

    };

    const cardService: Array<Users> = [
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af097",
            userName: "Amanda Reys",
            scheduleDate: "08/05/2022",
            scheduleTime: "08:00",
            amount: "Concluído",           
        },
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85ad2541",
            userName: "Augusto Oliveria",
            scheduleDate: "07/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "07:00",
            amount: "Concluído",            
        },
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af854",
            userName: "Igor Goldim",
            scheduleDate: "06/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "08:00",
            amount: "Concluído",            
        },       
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af0127",
            userName: "Suly Bastos",
            scheduleDate: "05/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "08:00",
            amount: "Cancelado",            
        },
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af0122",
            userName: "Calor Trindade",
            scheduleDate: "04/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "08:00",
            amount: "Concluído",            
        },
        {
            id: "3cb32ade-ac5d-40b5-bf25-b135c85af0122",
            userName: "Trindade Jr",
            scheduleDate: "03/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "07:30",
            amount: "Concluído",            
        },
        {
            id: "4cb32ade-ac5d-40b5-bf25-b135c85af0122",
            userName: "Maria José",
            scheduleDate: "02/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "07:00",
            amount: "Concluído",            
        },   
    ];

    return (
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHeadUser 
                userName='Igor' 
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true} 
                onPress={() => navigation.navigate('Menu')} />
            <View style={{display: "flex", flexDirection: "row", justifyContent:'space-between',  marginTop: 75}}>
                <BigText textStyles={{color: secondColor, fontSize: 28, fontWeight: '800'}}>Saldo</BigText>  
                <TouchableOpacity>
                    <Icon name="md-arrow-forward" color={secondColor} size={30} /> 
                </TouchableOpacity>
            </View>           
            <RegularText textStyles={{color: secondColor, fontSize: 28, fontWeight: '400'}}>R$ 999,99</RegularText> 

            <CardSection data={cardData} primaryColor={primaryColor} secondColor={secondColor} />

            <TransactionSection data={cardService} title={"Serviços"} subtitle={"Recentes"} primaryColor={primaryColor} secondColor={secondColor}/>

        </Container>);
}

export default ProviderDashboard;