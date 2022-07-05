import React from 'react';
import { schedulingData } from '../../types/AppType';
import RegularText from '../Texts/RegularText';
import { ServiceButton, ServiceDate, ServiceFooter, ServiceFooterItem, ServiceHead, ServicesRow, ServiceStatus, ServiceValor } from './Services.s';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { useAppData } from '../../services';



const ServicesItem: React.FC<schedulingData> = ( props ) => {
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

    return (
        <ServicesRow style={{backgroundColor: secondColor}}>
            <ServiceHead>
                <RegularText textStyles={{
                        color: primaryColor,
                        textAlign: 'left',
                        fontWeight:'800'                    
                    }}>
                    Serviço #{props.order?.toString().padStart(6, '0')}
                </RegularText>
               <ServiceStatus  style={{backgroundColor: primaryColor}}>
                    <RegularText textStyles={{
                            color: secondColor,
                            fontSize: 14,
                            textAlign: 'left',
                            fontWeight:'800'                    
                        }}>
                        {props.status}
                    </RegularText>
               </ServiceStatus>                              
            </ServiceHead>
            <ServiceDate>
                <RegularText textStyles={{
                            color: primaryColor,
                            fontSize: 16,
                            textAlign: 'left',
                            fontWeight:'400'                    
                        }}>
                        {props.scheduleDate} - {props.scheduleTime}
                </RegularText>
            </ServiceDate>
            <ServiceFooter>
               <ServiceFooterItem>
                <ServiceValor>
                        <RegularText textStyles={{
                                color: primaryColor,
                                fontSize: 20,
                                textAlign: 'left',
                                fontWeight:'400'                    
                            }}>
                            Valor
                        </RegularText>
                        <RegularText textStyles={{
                                color: primaryColor,
                                fontSize: 24,
                                textAlign: 'left',
                                fontWeight:'800'                    
                            }}>
                            {props.amount?.toString()}
                        </RegularText>
                </ServiceValor>                
               </ServiceFooterItem>
               {userType === "P" &&
                   <ServiceFooterItem>
                        <ServiceValor>
                                <RegularText textStyles={{
                                        color: primaryColor,
                                        fontSize: 20,
                                        textAlign: 'left',
                                        fontWeight:'400'                    
                                    }}>
                                    Taxa
                                </RegularText>
                                <RegularText textStyles={{
                                        color: primaryColor,
                                        fontSize: 24,
                                        textAlign: 'left',
                                        fontWeight:'800'                    
                                    }}>
                                    {props.tax?.toString()}
                                </RegularText>
                        </ServiceValor>                
                   </ServiceFooterItem>
                }
               <ServiceButton  style={{backgroundColor: primaryColor}}>
                 <Icon name="arrow-right-thick"  size={30} color={secondColor} />
               </ServiceButton>      
            </ServiceFooter>           
        </ServicesRow>
    );
}

export default ServicesItem;