import React from "react";
import { View } from "react-native";
import CardSection from "../../../components/Cards/CardSection";
import ScreenHeadUser from "../../../components/Head/ScreenHeadUser";
import Icon from 'react-native-vector-icons/Ionicons';
import BigText from "../../../components/Texts/BigText";
import RegularText from "../../../components/Texts/RegularText";
import TransactionSection from "../../../components/Transaction/TransactionSection";
import { useAppData } from "../../../services";
import { ScreensProps, TUser } from "../../../types/AppType";
import { Container } from "./ProviderDashboard.s";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fetchData } from "../service";
import CardSectionFake from "../../../components/Cards/CardSectionFake";
import TransactionSectionFake from "../../../components/Transaction/TransactionSectionFake";

const ProviderDashboard: React.FC<ScreensProps> = ({navigation}) => {
    const [name, setName] = React.useState("Usuário");
    const [data, setData] = React.useState<TUser>();

    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    React.useEffect(() =>{
    
        const loadData = async () => {
            const {primaryColor:strPrimaryColor, secondColor: strSecondColor, Name, userId, appKey } = await useAppData();
            setPrimaryColor(strPrimaryColor); 
            setSecondColor(strSecondColor); 
            setName(Name);

            var { sucessful, data, message } = await fetchData({id: userId,  appid: appKey}); 
            //console.log(data?.servicesAgendados);   

            setData(data);
        };
        
        loadData();

    },[]);

    const showModalScheduling = (item:TUser) =>{

    };

    return (
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHeadUser 
                userName={name.split(" ")[0]} 
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

export default ProviderDashboard;