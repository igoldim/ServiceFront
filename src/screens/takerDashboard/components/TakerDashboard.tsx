import React from "react";
import CardSection from "../../../components/Cards/CardSection";
import { Colors } from "../../../components/Colors";
import ScreenHeadUser from "../../../components/Head/ScreenHeadUser";
import SearchInput from "../../../components/Input/SearchInput";
import BigText from "../../../components/Texts/BigText";
import RegularText from "../../../components/Texts/RegularText";
import TransactionSection from "../../../components/Transaction/TransactionSection";
import { useAppData } from "../../../services";
import { ScreensProps, Users } from "../../../types/AppType";
import { Container } from "./TakerDashboard.s";

const TakerDashboard: React.FC<ScreensProps> = ({navigation}) => {
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
        type: "P",
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
        type: "P",
    },
  ];

  const showModalScheduling = (item:Users) =>{

  };

const cardService = [
    {
        id: "2cb32ade-ac5d-40b5-bf25-b135c85af097",
        userName: "Amanda Reys",
        scheduleDate: "08/05/2022", // ==> pegar dia da semana (Segunda)
        scheduleTime: "08:00",
        amount: "Concluído",
        art: {
            icon: "checkbox",
            background: Colors.Salmon
        },
    },
    {
        id: "2cb32ade-ac5d-40b5-bf25-b135c85ad2541",
        userName: "Augusto Oliveria",
        scheduleDate: "07/05/2022", // ==> pegar dia da semana (Segunda)
        scheduleTime: "07:00",
        amount: "Concluído",
        art: {
            icon: "checkbox",
            background: Colors.Salmon
        },
    },
    {
        id: "2cb32ade-ac5d-40b5-bf25-b135c85af854",
        userName: "Igor Goldim",
        scheduleDate: "06/05/2022", // ==> pegar dia da semana (Segunda)
        scheduleTime: "08:00",
        amount: "Concluído",
        art: {
            icon: "checkbox",
            background: Colors.Salmon
        },
    },       
    {
        id: "2cb32ade-ac5d-40b5-bf25-b135c85af0127",
        userName: "Suly Bastos",
        scheduleDate: "05/05/2022", // ==> pegar dia da semana (Segunda)
        scheduleTime: "08:00",
        amount: "Cancelado",
        art: {
            icon: "checkbox",
            background: Colors.Salmon
        },
    },
    {
        id: "2cb32ade-ac5d-40b5-bf25-b135c85af0122",
        userName: "Calor Trindade",
        scheduleDate: "04/05/2022", // ==> pegar dia da semana (Segunda)
        scheduleTime: "08:00",
        amount: "Concluído",
        art: {
            icon: "checkbox",
            background: Colors.Salmon
        },
    },
    {
        id: "3cb32ade-ac5d-40b5-bf25-b135c85af0122",
        userName: "Trindade Jr",
        scheduleDate: "03/05/2022", // ==> pegar dia da semana (Segunda)
        scheduleTime: "07:30",
        amount: "Concluído",
        art: {
            icon: "checkbox",
            background: Colors.Salmon
        },
    },
    {
        id: "4cb32ade-ac5d-40b5-bf25-b135c85af0122",
        userName: "Maria José",
        scheduleDate: "02/05/2022", // ==> pegar dia da semana (Segunda)
        scheduleTime: "07:00",
        amount: "Concluído",
        art: {
            icon: "checkbox",
            background: Colors.Salmon
        },
    },   
];

    return (
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHeadUser 
                userName='Igor' 
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true}  
                onPress={() => navigation.navigate('Menu')}/>
            <SearchInput
                    onSearchButton={() => navigation.navigate('Resultado')} 
                    iconeName='account-search-outline'
                    iconeColor={secondColor}
                    placeholder="Buscar prestador de serviço"
                    placeholderColor={primaryColor}
                    inputStyles={{                       
                        color: primaryColor, 
                        fontSize: 17.8, 
                        fontWeight: '800',
                    }}
                    ViewStyles={{
                        backgroundColor: secondColor, 
                    }}
                    iconStyles={{backgroundColor: primaryColor}}
                    onLocationhButton={() => navigation.navigate('Resultado')} 
                /> 
                <BigText textStyles={{color: secondColor, fontSize: 28, fontWeight: '800'}}>Total de Serviços</BigText>  
                <RegularText textStyles={{color: secondColor, fontSize: 28, fontWeight: '400'}}>R$ 999,99</RegularText> 

                <CardSection data={cardData} primaryColor={primaryColor} secondColor={secondColor} />

                <TransactionSection data={cardService} title={"Serviços"} subtitle={"Recentes"} primaryColor={primaryColor} secondColor={secondColor} />

        </Container>);
}

export default TakerDashboard;