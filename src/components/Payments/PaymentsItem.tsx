import React from 'react';
import { TPaymentsProps } from '../../types/AppType';
import RegularText from '../Texts/RegularText';
import { ServiceButton, ServiceDate, ServiceFooter, ServiceFooterItem, ServiceHead, ServicesRow, ServiceStatus, ServiceValor } from './Payments.s';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { useAppData } from '../../services';



const PaymentsItem: React.FC<TPaymentsProps> = ( props ) => {
    return (
        <ServicesRow style={{backgroundColor: props.secondColor}}>
            <ServiceHead>
                <RegularText textStyles={{
                        color: props.primaryColor,
                        textAlign: 'left',
                        fontWeight:'800'                    
                    }}>
                    {props.paymentMethod?.toString() === "D" ? "Pix": "Catão"} #{props.locationId?.toString().padStart(6, '0')}
                </RegularText>
               <ServiceStatus  style={{backgroundColor: props.primaryColor}}>
                    <RegularText textStyles={{
                            color: props.secondColor,
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
                            color: props.primaryColor,
                            fontSize: 16,
                            textAlign: 'left',
                            fontWeight:'400'                    
                        }}>
                        {props.paymentDate?.split("T")[0]} - {props.paymentDate?.split("T")[1]}
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
                            R$ { parseFloat(props.amount).toFixed(2).toString().replace(".", ",")}
                        </RegularText>
                </ServiceValor>                
               </ServiceFooterItem>               
               <ServiceButton  style={{backgroundColor: props.primaryColor}}>
                 <Icon name="arrow-right-thick"  size={30} color={props.secondColor} />
               </ServiceButton>      
            </ServiceFooter>           
        </ServicesRow>
    );
}

export default PaymentsItem;