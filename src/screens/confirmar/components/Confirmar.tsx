import React from 'react';
import RegularButton from '../../../components/Buttons/RegularButton';
import { CardRow } from '../../../components/Cards/CardItem.s';
import ScreenHead from '../../../components/Head/ScreenHead';
import { Container } from '../../../components/Shared';
import RegularText from '../../../components/Texts/RegularText';
import { useAppData } from '../../../services';
import { ScreensProps } from '../../../types/AppType';
import Icon from 'react-native-vector-icons/Ionicons';

const Confirmar: React.FC<ScreensProps> = ({navigation})  => {
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");


    const [scheduleDate, setScheduleDate] = React.useState("01/01/2000");
    const [scheduleTime, setScheduleTime] = React.useState("00:00");
    const [valor, setValor] = React.useState("100,00");
    
    React.useEffect(() =>{
    
    const loadData = async () => {
      const {primaryColor:strPrimaryColor, secondColor: strSecondColor } = await useAppData();
      setPrimaryColor(strPrimaryColor); 
      setSecondColor(strSecondColor); 

      //carrega dados da api
    };
    
    loadData();
  },[]);

    return (
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                screenName="Confirmar" 
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true} 
                onPress={() => navigation.navigate("Menu")} />
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
                onPress={() => {}}>
                Confirmar
            </RegularButton>
            
        </Container>
    );
};  

export default Confirmar;