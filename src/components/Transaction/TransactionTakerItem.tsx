import React from 'react';
import { View } from 'react-native';
import { useAppData } from '../../services';
import { TServices } from '../../types/AppType';
import RegularText from '../Texts/RegularText';
import SmallText from '../Texts/SmallText';
import TransactionAvi from './TransactionAvi';
import { LeftRow, RightRow, TransactionRow } from './TransactionItem.s';

const TransactionTakerItem: React.FC<TServices> = ( props ) => {
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    React.useEffect(() =>{
    
        const loadData = async () => {
            const {primaryColor:strPrimaryColor, secondColor: strSecondColor} = await useAppData();
            setPrimaryColor(strPrimaryColor); 
            setSecondColor(strSecondColor); 
        };
        
        loadData();

    },[]);
    return (
        <TransactionRow>
            <LeftRow>
                <TransactionAvi primaryColor={primaryColor} secondColor={secondColor} icon='checkmark-done'/>
                <View style={{marginLeft: 10}}>
                    <RegularText textStyles={{
                        color: secondColor,
                        textAlign: 'left',
                        marginBottom: 5,
                        fontWeight:'800'                    
                    }}>
                        {props.proffisional && props.proffisional.name.split(" ")[0]} {props.proffisional && props.proffisional.name.split(" ")[props.proffisional.name.split(" ").length -1]}
                    </RegularText>
                    <SmallText textStyles={{
                        color: secondColor,
                        textAlign: 'left',
                    }}>
                        {props.schedule && props.schedule.scheduleDateTime.split("T")[0]}
                    </SmallText>
                </View>
            </LeftRow>
            <RightRow>
            <RegularText textStyles={{
                    color: secondColor,
                    textAlign: 'right',
                    marginBottom: 5,                    
                    fontWeight:'600'
                }}>
                    R$ {props.amountValue}
                </RegularText>
                <SmallText textStyles={{
                    color: secondColor,
                    textAlign: 'right',
                }}>
                    {props.schedule && props.schedule.scheduleDateTime.split("T")[1]}
                </SmallText>
            </RightRow>
        </TransactionRow>
    );
}

export default TransactionTakerItem;