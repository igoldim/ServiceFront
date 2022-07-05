import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ScreenHead from "../../../components/Head/ScreenHead";
import ScreenHeadNegative from "../../../components/Head/ScreenHeadNegative";
import CommentList from "../../../components/Lists/CommentList";
import SearchResultList from "../../../components/Lists/SearchResultList";
import StyledAgendarList from "../../../components/Lists/StyledAgendarList";
import StyledList from "../../../components/Lists/StyledList";
import { Container, Row } from "../../../components/Shared";
import Stars from "../../../components/Stars";
import BigText from "../../../components/Texts/BigText";
import { useAppData } from "../../../services";
import { ScreensProps, TAgenda, TComment, TSearch } from "../../../types/AppType";
import { Avatar } from "./Agendar.s";

const Agendar: React.FC<ScreensProps> = ({navigation}) =>{

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

    const agendaData : Array<TAgenda> = [
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af097",
            scheduleDate: "07/05/2022", // ==> pegar dia da semana (Sabádo)
            scheduleTime: "08:00",
            amount: "100,00",
            status: "A"
        },
        {
            id: "2cb32ade-ac5d-50b5-bf25-b135c85af097",
            scheduleDate: "08/05/2022", // ==> pegar dia da semana (Sabádo)
            scheduleTime: "08:00",
            amount: "90,00",
            status: "A"
        },
        {
            id: "2cb32ade-ac5d-50b5-bf25-sdcdc85af097",
            scheduleDate: "08/05/2022", // ==> pegar dia da semana (Sabádo)
            scheduleTime: "08:00",
            amount: "90,00",
            status: "A"
        },
        {
            id: "2cb32ade-ac5d-50b5-bf25-sdcdc85fes097",
            scheduleDate: "08/05/2022", // ==> pegar dia da semana (Sabádo)
            scheduleTime: "08:00",
            amount: "90,00",
            status: "A"
        },
        {
            id: "2cb32ade-ac5d-50b5-bf25-sdfdc85af097",
            scheduleDate: "08/05/2022", // ==> pegar dia da semana (Sabádo)
            scheduleTime: "08:00",
            amount: "90,00",
            status: "A"
        },
    ];

    const commenthResult : Array<TComment> = [
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af097",
            name:"Igor Goldim",
            avatar: "https://imagens.circuit.inf.br/noAvatar.png",            
            amount: "100,00",
            stars: 5,
            comment :"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, ..."
        },
        {
            id: "2cb32ade-ac5d-50b5-bf25-b135c85af097",
            name:"Augusto Oliveira",
            avatar: "https://imagens.circuit.inf.br/noAvatar.png",            
            amount: "120,00",
            stars: 4,
            comment :"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, ..."
        },
        {
            id: "2cb32ade-ac5d-50b5-bf25-sdcdc85af097",
            name:"Igor Augusto",
            avatar: "https://imagens.circuit.inf.br/noAvatar.png",            
            amount: "100,00",
            stars: 5,
            comment :"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, ..."
        },
    ];

    return (
        <Container style={{backgroundColor: secondColor}}>
            <ScreenHeadNegative 
                screenName="Agendar"  
                onPress={() => navigation.navigate("Resultado")}
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true}
                showRightMenu={false}
            />
            <View style={{backgroundColor: secondColor, width: '100%', height:'30%', padding: 10}}>
                <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                    <BigText textStyles={{color: primaryColor, fontSize: 24, fontWeight: '800'}} >Igor Goldim</BigText>
                    <Stars 
                        isSave={false} 
                        onPress={() => {}}  
                        value={5} 
                        showNumber={false}                     
                        width="20" 
                        height='20' 
                        startStyle={{marginBottom: 10, alignSelf: 'center'}}
                        color={primaryColor}
                    />
                </View>
            </View>
            <View style={{backgroundColor: primaryColor, width: '120%', height:'70%', margin: -20}}>
                <View style={{alignSelf:'center', marginTop: -140}}>
                        <Avatar 
                            source={{uri: 'https://imagens.circuit.inf.br/noAvatar.png'}} 
                            style={{backgroundColor: primaryColor}}  />             
                </View>
                <View style={{marginTop: -20, paddingLeft: 20, paddingRight: 40,  display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                    <BigText textStyles={{color: secondColor, fontSize: 24, fontWeight: '800'}} >10Km</BigText>
                    <BigText textStyles={{color: secondColor, fontSize: 24, fontWeight: '800'}} >100,00</BigText>
                </View>
                <View style={{width: '100%', height:'45%', margin: 0}}>
                    <StyledAgendarList 
                        style={{marginTop: 15, marginLeft: 20}}
                        data={agendaData} 
                        primaryColor={primaryColor} 
                        secondColor={secondColor} 
                        onPress={() => navigation.navigate("Confirmar")}
                    />
                </View>
                <View style={{width: '100%', height:'40%', margin: 0}}>
                    <CommentList
                        style={{marginLeft: 20}} 
                        data={commenthResult} 
                        primaryColor={primaryColor} 
                        secondColor={secondColor} 
                    />
                </View>
            </View>
        </Container>
    );
}

export default Agendar;