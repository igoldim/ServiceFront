import React from 'react';
import { View } from 'react-native';
import { useAppData } from '../../services';
import { TServices } from '../../types/AppType';
import RegularText from '../Texts/RegularText';
import SmallText from '../Texts/SmallText';
import { TransactionProps } from './Transaction.t';
import TransactionAvi from './TransactionAvi';
import { LeftRow, RightRow, TransactionRow } from './TransactionItem.s';

const TransactionItem: React.FC<TServices> = ( props ) => {
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
                        {props.user && props.user.name}
                        {props.proffisional && props.proffisional.name}
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
                    fontWeight:'800'
                }}>
                    {props.amountValue.toFixed(2).toString()}
                </RegularText>
                <SmallText textStyles={{
                    color: secondColor,
                    textAlign: 'right',
                }}>
                    {props.schedule && props.schedule.scheduleDateTime.split("T")[1].substring(0,5)}
                </SmallText>
            </RightRow>
        </TransactionRow>
    );
}

export default TransactionItem;
