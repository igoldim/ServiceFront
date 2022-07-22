import React from 'react';
import { TServicesProps } from '../../types/AppType';
import RegularText from '../Texts/RegularText';
import { ServiceButton, ServiceDate, ServiceFooter, ServiceFooterItem, ServiceHead, ServicesRow, ServiceStatus, ServiceValor } from './Scheduling.s';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const SchedulingItem: React.FC<TServicesProps> = ( props ) => {

    const navigation = useNavigation();

    const handleDetails = async () => {

        await AsyncStorage.setItem("serviceId", props.id);
        await AsyncStorage.setItem("rota", "Scheduling");

        navigation.reset({
            index: 1,
            routes: [
            { name: "ScheduleDatailsProvider" },
            ],
        });

    }


    return (
        <ServicesRow style={{backgroundColor: props.secondColor}}>
            <ServiceHead>
                <RegularText textStyles={{
                        color: props.primaryColor,
                        textAlign: 'left',
                        fontWeight:'800'                    
                    }}>
                    Nº #{props.order?.toString().padStart(6, '0')}
                </RegularText>
               <ServiceStatus  style={{backgroundColor: props.primaryColor}}>
                    <RegularText textStyles={{
                            color: props.secondColor,
                            fontSize: 14,
                            textAlign: 'left',
                            fontWeight:'800'                    
                        }}>
                        {props.status === "S" ? "Agendado" : props.status === "E" ? "Excutado" : props.status === "C" ? "Cancelado": "Faltou"}
                    </RegularText>
               </ServiceStatus>                              
            </ServiceHead>
            <ServiceDate>
                <RegularText textStyles={{
                            color: props.primaryColor,
                            fontSize: 16,
                            textAlign: 'left',
                            fontWeight:'400'                    
                        }}>
                        {props.schedule.scheduleDateTime.split("T")[0]} - {props.schedule.scheduleDateTime.split("T")[1]}
                </RegularText>
            </ServiceDate>
            <ServiceFooter>
               <ServiceFooterItem>
                <ServiceValor>
                        <RegularText textStyles={{
                                color: props.primaryColor,
                                fontSize: 20,
                                textAlign: 'left',
                                fontWeight:'400'                    
                            }}>
                            Valor
                        </RegularText>
                        <RegularText textStyles={{
                                color: props.primaryColor,
                                fontSize: 24,
                                textAlign: 'left',
                                fontWeight:'800'                    
                            }}>
                            {props.amountValue?.toString()}
                        </RegularText>
                </ServiceValor>                
               </ServiceFooterItem>               
               <ServiceButton  style={{backgroundColor: props.primaryColor}} onPress={handleDetails}>
                 <Icon name="arrow-right-thick"  size={30} color={props.secondColor} />
               </ServiceButton>      
            </ServiceFooter>           
        </ServicesRow>
    );
}

export default SchedulingItem;