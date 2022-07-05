import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import FavoriteList from "../../../components/Favorites/FavoriteList";
import ScreenHead from "../../../components/Head/ScreenHead";
import { useAppData } from "../../../services";
import { FavoriteData, schedulingData, ScreensProps } from "../../../types/AppType";
import { Container } from "./Favorites.s";

const Favorites: React.FC<ScreensProps> = ({navigation}) =>{
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");
    const [userType, setUserType] = React.useState<string>("");

    React.useEffect(() =>{
    
    const loadData = async () => {
      const {primaryColor:strPrimaryColor, secondColor: strSecondColor } = await useAppData();
      const UserType = await AsyncStorage.getItem('UserType');
      setUserType(UserType as string);

      setPrimaryColor(strPrimaryColor); 
      setSecondColor(strSecondColor); 
    };
    
    loadData();

  },[]);

  const cardService: Array<FavoriteData> = [
    {
        id: "2cb32ade-ac5d-40b5-bf25-b135c85af097",
        userName: "Amanda Reys",
        scheduleDate: "08/05/2022",
        scheduleTime: "08:00",
        amount: 'R$ 100,00',
        stars: 5
    },
    {
        id: "2cb32ade-ac5d-40b5-bf25-b135c85ad2541",
        userName: "Augusto Oliveria",
        scheduleDate: "07/05/2022", // ==> pegar dia da semana (Segunda)
        scheduleTime: "07:00",
        amount: 'R$ 100,00',
        stars: 4
    },
    {
        id: "2cb32ade-ac5d-40b5-bf25-b135c85af854",
        userName: "Igor Goldim",
        scheduleDate: "06/05/2022", // ==> pegar dia da semana (Segunda)
        scheduleTime: "08:00",
        amount: 'R$ 100,00',
        stars: 3
    },       
    {
        id: "2cb32ade-ac5d-40b5-bf25-b135c85af0127",
        userName: "Suly Bastos",
        scheduleDate: "05/05/2022", // ==> pegar dia da semana (Segunda)
        scheduleTime: "08:00",
        amount: 'R$ 100,00',
        stars: 4
    },
    {
        id: "2cb32ade-ac5d-40b5-bf25-b135c85af0122",
        userName: "Calor Trindade",
        scheduleDate: "04/05/2022", // ==> pegar dia da semana (Segunda)
        scheduleTime: "08:00",
        amount: 'R$ 100,00',
        stars: 5
    },
    {
        id: "3cb32ade-ac5d-40b5-bf25-b135c85af0122",
        userName: "Trindade Jr",
        scheduleDate: "03/05/2022", // ==> pegar dia da semana (Segunda)
        scheduleTime: "07:30",
        amount: 'R$ 100,00',
        stars: 4
    },
    {
        id: "4cb32ade-ac5d-40b5-bf25-b135c85af0122",
        userName: "Maria José",
        scheduleDate: "02/05/2022", // ==> pegar dia da semana (Segunda)
        scheduleTime: "07:00",
        amount: 'R$ 100,00',
        stars: 2
    },   
  ]; 


    return (
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                screenName="Favoritos"  
                onPress={() => navigation.navigate("Menu")}
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true} />
            <FavoriteList data={cardService}/>
        </Container>
    );
}

export default Favorites;