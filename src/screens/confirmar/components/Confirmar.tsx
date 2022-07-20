import React from 'react';
import RegularButton from '../../../components/Buttons/RegularButton';
import { CardRow } from '../../../components/Cards/CardItem.s';
import ScreenHead from '../../../components/Head/ScreenHead';
import { Container } from '../../../components/Shared';
import RegularText from '../../../components/Texts/RegularText';
import { useAppData } from '../../../services';
import { ScreensProps } from '../../../types/AppType';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import MessageAlertModal from '../../../components/Modals/MessageAlertModal';
import { fetchSetSchedule } from '../services';

const Confirmar: React.FC<ScreensProps> = ({navigation})  => {
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    const [id, setId] = React.useState<string>("");
    const [profissionalId, setProfissionalId] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");
    const [scheduleDateTime, setScheduleDateTime] = React.useState("01/01/2000 08:00:00");
    const [scheduleDate, setScheduleDate] = React.useState("01/01/2000");
    const [scheduleTime, setScheduleTime] = React.useState("00:00");
    const [valor, setValor] = React.useState("0,00");


    const [visible, setVisible] = React.useState(false);
    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [messageModal, setMessageModal] = React.useState('');
    const [type, setType] = React.useState("erro");

    
    React.useEffect(() =>{
        loadData();
    },[]);
  
    const loadData = async () => {
        const {primaryColor:strPrimaryColor, secondColor: strSecondColor} = await useAppData();
        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 

        //carrega dados da api
        const scheduleId = await AsyncStorage.getItem("scheduleId") as string;
        setId(scheduleId);
        const profisionalId = await AsyncStorage.getItem("selectedUserId") as string;
        setProfissionalId(profisionalId);
        const scheduleName = await AsyncStorage.getItem("scheduleName") as string;
        setName(scheduleName)
        const ScheduleDateTime = await AsyncStorage.getItem("scheduleDateTime") as string;
        setScheduleDateTime(ScheduleDateTime);
        setScheduleDate(ScheduleDateTime.split("T")[0]);
        setScheduleTime(ScheduleDateTime.split("T")[1]);
        const scheduleAmount = await AsyncStorage.getItem("scheduleAmount") as string;;
        setValor(scheduleAmount);
    };

    const handleConfirm = async () => {

        //confirma agendamento
        const {userId, appKey: appId } = await useAppData();

        const {sucessful, data, message} = await fetchSetSchedule({appId, profissionalId , scheduleId: id, serviceValue: valor, userId});
        if (sucessful){
            showModal("Parabéns,", message , "success");  
        }
        else{
            showModal("Ops..,", message , "erro");  
        }
    }

    const showModal = (headText: string, message: string, type: string)=> {
        setMessageHeadding(headText);
        setMessageModal(message);
        setType(type);
        setVisible(true);
    }
  
    const modalButtonHandle = () =>{
        setVisible(false);
        navigation.reset({
            index: 1,
            routes: [
              { name: 'TakerDashboard' },
            ],
          });
    }

    return (
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                screenName="Confirmar" 
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true} 
                onPress={() => navigation.goBack()} />
            <CardRow style={{marginTop:30}}>
                <RegularText textStyles={{color: secondColor, fontSize: 24, fontWeight: '600'}}>
                    <Icon name="person" color={secondColor} size={24}/> 
                    {" " + name}
                </RegularText>    
            </CardRow>
            <CardRow style={{marginTop:30, marginBottom:30}}>
                <RegularText textStyles={{color: secondColor, fontSize: 24, fontWeight: '600'}}>
                    <Icon name="calendar" color={secondColor} size={24}/> 
                    {" " + scheduleDate}
                </RegularText>    
                <RegularText textStyles={{color: secondColor, fontSize: 24, fontWeight: '600'}}>
                    <Icon name="time" color={secondColor} size={24}/> 
                    {" " + scheduleTime}
                </RegularText>    
            </CardRow>
            <CardRow style={{marginBottom:60}}>
                <RegularText textStyles={{color: secondColor, fontSize: 24, fontWeight: '600'}}>
                    <Icon name="logo-usd" color={secondColor} size={24}/> 
                    {" " + valor}
                </RegularText>    
            </CardRow>


            <RegularButton            
                btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center'}}
                textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                onPress={() => handleConfirm()}>
                Confirmar
            </RegularButton>
            

            <MessageAlertModal 
              visible={visible} 
              heading={messageHeadding} 
              message={messageModal} 
              onPress={modalButtonHandle}
              type={type}
              primaryColor={primaryColor}
              secondColor={secondColor}                
            />
        </Container>
    );
};  

export default Confirmar;