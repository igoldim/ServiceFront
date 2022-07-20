import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import { View } from "react-native";
import ScreenHeadNegative from "../../../components/Head/ScreenHeadNegative";
import CommentList from "../../../components/Lists/CommentList";
import StyledAgendarList from "../../../components/Lists/StyledAgendarList";
import { Container, Row } from "../../../components/Shared";
import Stars from "../../../components/Stars";
import BigText from "../../../components/Texts/BigText";
import { useAppData } from "../../../services";
import { ScreensProps, TAgenda, TComment, TSchedule, TSearch } from "../../../types/AppType";
import { fetchFavorite, fetchGetPerfilAgenda } from "../services";
import { Avatar } from "./Agendar.s";

const Agendar: React.FC<ScreensProps> = ({navigation}) =>{

    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");
    const [id, setId] = React.useState<string>("");
    const [userName, setUserNAme] = React.useState<string>("");
    const [amountService, setAmountService] = React.useState<string>("0,00");
    const [distance, setDistance] = React.useState<number>(0);
    const [rate, setRate] = React.useState<number>(0);
    const [favorite, setFavorite] = React.useState<boolean>(false);
    const [avatar, setAvatar] = React.useState<string>("https://imagens.circuit.inf.br/noAvatar.png");
    const [agendaData, setAgendaData] = React.useState<Array<TSchedule>>();
    const [commenthResult, setCommenthResult] = React.useState<Array<TComment>>();
    const [isLoading, setLoading] = React.useState(false);
    const [route, setRoute] = React.useState<string>("");

    React.useEffect(() =>{
        loadData();
    },[]);

    const loadData = async () => {
        setLoading(true);
        const {primaryColor:strPrimaryColor, secondColor: strSecondColor, userId,  appKey: appId } = await useAppData();
        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 

        const id = await AsyncStorage.getItem("selectedUserId") as string;
        const rota = await AsyncStorage.getItem("route") as string;
        setRoute(rota);

        const latitude = await AsyncStorage.getItem('latitude')  as string;
        const longitude = await AsyncStorage.getItem('longitude')  as string;

        //carrega dados da api
        var { sucessful, data, message } = await fetchGetPerfilAgenda({id, userId, appId, latitude, longitude, distance: 10}); 
        if (sucessful){
            //console.log(data.comments);
            setId(data.id);
            setAvatar(data.avatar?.toString() as string + '?'+Math.random().toString(36).substring(9));
            setUserNAme(data.name);
            setFavorite(data.favorite!);
            setAmountService(data.serviceAmount!);
            setAgendaData(data.schedules); 
            setCommenthResult(data.comments);
            setRate(data.rate!);
            setDistance(data.distance!);
        }
        setLoading(false);
    };


    const handleFavorite = async () => {
        const {userId,  appKey: appId } = await useAppData();
        if (favorite){
            //remove from favorite 
            var { sucessful } = await fetchFavorite({userId, profissionalId: id, appId, favorite: false}); 
            if (sucessful){    
                setFavorite(false);
            }
        }
        else{
            //add to favorite 
            var { sucessful } = await fetchFavorite({userId, profissionalId: id, appId, favorite: true}); 
            if (sucessful){    
                setFavorite(true);
            }
        }
    }


    return (
        <Container style={{backgroundColor: secondColor}}>
            <ScreenHeadNegative 
                screenName="Agendar"  
                onPress={() => route != "" ? navigation.navigate(`${route}`) :navigation.navigate("TakerDashboard")}
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true}
                showRightIcon={true} 
                RightIconName={favorite ? "heart" : "heart-outline"}
                onRightPress={handleFavorite}
            />
            <View style={{backgroundColor: secondColor, width: '100%', height:'30%', padding: 5}}>
                <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                    <BigText textStyles={{color: primaryColor, fontSize: 20, fontWeight: '800'}} >{userName.trim().split(" ")[0]} {userName.trim().split(" ")[ userName.trim().split(" ").length-1]}</BigText>
                    <Stars 
                        isSave={false} 
                        onPress={() => {}}  
                        value={rate} 
                        showNumber={false}                     
                        width="20" 
                        height='20' 
                        startStyle={{marginBottom: 10, alignSelf: 'center'}}
                        color={primaryColor}
                    />
                </View>
            </View>
            <View style={{backgroundColor: primaryColor, width: '120%', height:'70%', margin: -20}}>
                <View style={{alignSelf:'center', marginTop: -130, marginLeft: -30}}>
                        <Avatar 
                            source={{uri: avatar}} 
                            style={{backgroundColor: primaryColor}}  />             
                </View>
                <View style={{marginTop: -40, paddingLeft: 20, paddingRight: 40,  display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                    <BigText textStyles={{color: secondColor, fontSize: 20, fontWeight: '800'}} >{distance} Km</BigText>
                    <BigText textStyles={{color: secondColor, fontSize: 20, fontWeight: '800'}} >R$ {amountService}</BigText>
                </View>
                <View style={{width: '100%', height:'45%', margin: 0}}>
                    <StyledAgendarList 
                        style={{marginTop: 15, marginLeft: 20}}
                        data={agendaData as Array<TSchedule>} 
                        primaryColor={primaryColor} 
                        secondColor={secondColor} 
                        onRefresh={loadData}
                        refreshing={isLoading}
                        onPress={() => navigation.navigate("Confirmar")}
                    />
                </View>
                <View style={{width: '100%', height:'40%', margin: 0}}>
                    <CommentList
                        data={commenthResult as Array<TComment>} 
                        primaryColor={primaryColor} 
                        secondColor={secondColor} 
                        onRefresh={loadData}
                        refreshing={isLoading}
                    />
                </View>
            </View>
        </Container>
    );
}

export default Agendar;