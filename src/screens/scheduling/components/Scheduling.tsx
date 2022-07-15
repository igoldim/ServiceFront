import React from "react";
import ScreenHead from "../../../components/Head/ScreenHead";
import SchedulingList from "../../../components/Scheduling/SchedulingList";
import { Container } from "../../../components/Shared";
import { useAppData } from "../../../services";
import { TschedulingData, ScreensProps, TServices } from "../../../types/AppType";
import { fetchScheduling } from "../services";

const Scheduling: React.FC<ScreensProps> = ({navigation}) =>{
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");
    const [userType, setUserType] = React.useState<string>("");

    const [cardService, setCardService] = React.useState<Array<TServices> | null>([]);
    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() =>{
        loadData();
    },[]);

    const loadData = async () => {
        const {primaryColor:strPrimaryColor, secondColor: strSecondColor, UserType, userId, appKey } = await useAppData();
        setUserType(UserType as string);

        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 

        setLoading(true);
        //carrega favoritos do usuário
        const {sucessful, data, message} = await fetchScheduling({userId, appId: appKey});

        if (sucessful){
            //console.log(data);
            setCardService(data as Array<TServices>);
        }
        setLoading(false);

    };

    return (
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                screenName="Agendamentos"  
                onPress={() => navigation.navigate("Menu")}
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true} 
                showRightIcon={true} 
                RightIconName="clock-plus-outline" 
                onRightPress={() => navigation.navigate("TakerDashboard") }
                />
            <SchedulingList 
                data={cardService as Array<TServices>} 
                refreshing={isLoading} 
                onRefresh={loadData}
                primaryColor={primaryColor}
                secondColor={secondColor}
                />
        </Container>
    );
}

export default Scheduling;