import React from 'react';
import { View } from 'react-native';
import { Colors } from '../Colors';
import RegularText from '../Texts/RegularText';
import SmallText from '../Texts/SmallText';
import { TransactionProps } from './Transaction.t';
import TransactionAvi from './TransactionAvi';
import { LeftRow, RightRow, TransactionRow } from './TransactionItem.s';

const TransactionItem: React.FC<TransactionProps> = ( props ) => {
    return (
        <TransactionRow>
            <LeftRow>
                <TransactionAvi background={props.art.background} icon={props.art.icon} texto={props.scheduleDate.substring(0,2)}/>
                <View style={{marginLeft: 10}}>
                    <RegularText textStyles={{
                        color: Colors.Cyan,
                        textAlign: 'left',
                        marginBottom: 5,                    
                    }}>
                        {props.userName}
                    </RegularText>
                    <SmallText textStyles={{
                        color: Colors.Salmon,
                        textAlign: 'left',
                    }}>
                        {props.scheduleDate}
                    </SmallText>
                </View>
            </LeftRow>
            <RightRow>
            <RegularText textStyles={{
                    color: Colors.Cyan,
                    textAlign: 'right',
                    marginBottom: 5,                    
                }}>
                    {props.amount.toString()}
                </RegularText>
                <SmallText textStyles={{
                    color: Colors.Salmon,
                    textAlign: 'right',
                }}>
                    {props.scheduleTime}
                </SmallText>
            </RightRow>
        </TransactionRow>
    );
}

export default TransactionItem;
