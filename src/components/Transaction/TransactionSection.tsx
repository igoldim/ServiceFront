import React from 'react';
import { Colors } from '../Colors';
import RegularText from '../Texts/RegularText';
import { TransactionList, TransactionRow, TransactionSectionBackground } from './Transaction.s';
import { TransactionSectionProps } from './Transaction.t';

import Icon from 'react-native-vector-icons/Ionicons';
import TransactionItem from './TransactionItem';

const TransactionSection: React.FC<TransactionSectionProps> = ( props ) => {
    return (
        <TransactionSectionBackground>
            <TransactionRow style={{marginBottom: 25}}>
                <RegularText textStyles={{fontSize: 19, color: Colors.Salmon}}>
                    {props.title} 
                </RegularText>
                <RegularText textStyles={{fontSize: 19, color: Colors.Salmon}}>
                    {props.subtitle}
                   <Icon name="caret-down" color={Colors.DarkGray} size={13} /> 
                </RegularText>
            </TransactionRow> 
            <TransactionList data={props.data} 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{
                paddingBottom: 25
            }}
            keyExtractor={({ id }: any )=> id.toString()}
            renderItem={({ item }: any ) => <TransactionItem {...item} />}
            />
        </TransactionSectionBackground>
    );
};  

export default TransactionSection;