import React from "react";
import CardSection from "../../../components/Cards/CardSection";
import CardSectionFake from "../../../components/Cards/CardSectionFake";
import { Colors } from "../../../components/Colors";
import ScreenHeadUser from "../../../components/Head/ScreenHeadUser";
import SearchInput from "../../../components/Input/SearchInput";
import BigText from "../../../components/Texts/BigText";
import RegularText from "../../../components/Texts/RegularText";
import TransactionSection from "../../../components/Transaction/TransactionSection";
import TransactionSectionFake from "../../../components/Transaction/TransactionSectionFake";
import { useAppData } from "../../../services";
import { ScreensProps, TUser } from "../../../types/AppType";
import { fetchData } from "../service";
import { Container } from "./TakerDashboard.s";

const TakerDashboard: React.FC<ScreensProps> = ({navigation}) => {
    const [name, setName] = React.useState("Usuário");
    const [avatar, setAvatar] = React.useState("");
    const [data, setData] = React.useState<TUser>();

    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    React.useEffect(() =>{
    
        const loadData = async () => {
            const {primaryColor:strPrimaryColor, secondColor: strSecondColor, Name, userId, appKey, Avatar} = await useAppData();
            setPrimaryColor(strPrimaryColor); 
            setSecondColor(strSecondColor); 
            setName(Name);
            setAvatar(Avatar);

            var { sucessful, data, message } = await fetchData({id: userId,  appid: appKey}); 
            //console.log(data?.servicesAgendados);   

            setData(data);
        };
        
        loadData();

    },[]);


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
                userName={name.split(" ")[0]}  
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                avatar={avatar}
                showIcon={true}
                onPress={() => 
                    navigation.reset({
                        index: 1,
                        routes: [
                          { name: 'Menu' },
                        ],
                      })}
            />
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
                <RegularText textStyles={{color: secondColor, fontSize: 28, fontWeight: '400'}}>R$ {data?.serviceAmount}</RegularText> 

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
        </Container>);
}

export default TakerDashboard;