import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import ScreenHead from "../../../components/Head/ScreenHead";
import Services from "../../../components/Services/Services";
import { Container } from "../../../components/Shared";
import { useAppData } from "../../../services";
import { TschedulingData, ScreensProps } from "../../../types/AppType";

const Scheduling: React.FC<ScreensProps> = ({navigation}) =>{
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

  const cardService: Array<TschedulingData> = [
    {
        id: "2cb32ade-ac5d-40b5-bf25-b135c85af097",
        order: 1,
        userName: "Amanda Reys",
        scheduleDate: "08/05/2022",
        scheduleTime: "08:00",
        status: "Agendado",
        amount: 'R$ 100,00',
        tax: userType === "P" ? "R$ 10,00" : ""
    },
    {
        id: "2cb32ade-ac5d-40b5-bf25-b135c85ad2541",
        order: 2,
        userName: "Augusto Oliveria",
        scheduleDate: "07/05/2022", // ==> pegar dia da semana (Segunda)
        scheduleTime: "07:00",
        status: "Concluído",            
        amount: 'R$ 100,00',
        tax: userType === "P" ? "R$ 10,00" : ""
    },
    {
        id: "2cb32ade-ac5d-40b5-bf25-b135c85af854",
        order: 3,
        userName: "Igor Goldim",
        scheduleDate: "06/05/2022", // ==> pegar dia da semana (Segunda)
        scheduleTime: "08:00",
        status: "Concluído",            
        amount: 'R$ 100,00',
        tax: userType === "P" ? "R$ 10,00" : ""
    },       
    {
        id: "2cb32ade-ac5d-40b5-bf25-b135c85af0127",
        order: 4,
        userName: "Suly Bastos",
        scheduleDate: "05/05/2022", // ==> pegar dia da semana (Segunda)
        scheduleTime: "08:00",
        status: "Cancelado",            
        amount: 'R$ 100,00',
        tax: userType === "P" ? "R$ 10,00" : ""
    },
    {
        id: "2cb32ade-ac5d-40b5-bf25-b135c85af0122",
        order: 5,
        userName: "Calor Trindade",
        scheduleDate: "04/05/2022", // ==> pegar dia da semana (Segunda)
        scheduleTime: "08:00",
        status: "Concluído",            
        amount: 'R$ 100,00',
        tax: userType === "P" ? "R$ 10,00" : ""
    },
    {
        id: "3cb32ade-ac5d-40b5-bf25-b135c85af0122",
        order: 6,
        userName: "Trindade Jr",
        scheduleDate: "03/05/2022", // ==> pegar dia da semana (Segunda)
        scheduleTime: "07:30",
        status: "Concluído",            
        amount: 'R$ 100,00',
        tax: userType === "P" ? "R$ 10,00" : ""
    },
    {
        id: "4cb32ade-ac5d-40b5-bf25-b135c85af0122",
        order: 7,
        userName: "Maria José",
        scheduleDate: "02/05/2022", // ==> pegar dia da semana (Segunda)
        scheduleTime: "07:00",
        status: "Cancelado",            
        amount: 'R$ 100,00',
        tax: userType === "P" ? "R$ 0,00" : ""
    },   
  ]; 


    return (
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                screenName="Agendamentos"  
                onPress={() => navigation.navigate("Menu")}
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true} />
            <Services data={cardService}/>
        </Container>
    );
}

export default Scheduling;