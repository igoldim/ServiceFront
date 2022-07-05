import React from 'react';
import { View } from 'react-native';
import RegularText from '../Texts/RegularText';
import SmallText from '../Texts/SmallText';
import { TransactionProps } from './Transaction.t';
import TransactionAvi from './TransactionAvi';
import { LeftRow, RightRow, TransactionRow } from './TransactionItem.s';

const TransactionItem: React.FC<TransactionProps> = ( props ) => {
    return (
        <TransactionRow>
            <LeftRow>
                <TransactionAvi primaryColor={props.primaryColor} secondColor={props.secondColor} icon='checkmark-done' texto={props.scheduleDate.substring(0,2)}/>
                <View style={{marginLeft: 10}}>
                    <RegularText textStyles={{
                        color: props.secondColor,
                        textAlign: 'left',
                        marginBottom: 5,
                        fontWeight:'800'                    
                    }}>
                        {props.userName}
                    </RegularText>
                    <SmallText textStyles={{
                        color: props.secondColor,
                        textAlign: 'left',
                    }}>
                        {props.scheduleDate}
                    </SmallText>
                </View>
            </LeftRow>
            <RightRow>
            <RegularText textStyles={{
                    color: props.secondColor,
                    textAlign: 'right',
                    marginBottom: 5,                    
                    fontWeight:'800'
                }}>
                    {props.amount.toString()}
                </RegularText>
                <SmallText textStyles={{
                    color: props.secondColor,
                    textAlign: 'right',
                }}>
                    {props.scheduleTime}
                </SmallText>
            </RightRow>
        </TransactionRow>
    );
}

export default TransactionItem;
