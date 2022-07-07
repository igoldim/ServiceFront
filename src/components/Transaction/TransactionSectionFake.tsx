import React from 'react';
import RegularText from '../Texts/RegularText';
import {TransactionRow, TransactionSectionBackground } from './Transaction.s';

import Icon from 'react-native-vector-icons/Ionicons';
import { TransactionSectionFakeProps } from '../../interfaces';
import TransactionItemFake from './TransactionItemFake';

const TransactionSectionFake: React.FC<TransactionSectionFakeProps> = ( props ) => {
    return (
        <TransactionSectionBackground>
            <TransactionRow style={{marginBottom: 15}}>
                <RegularText textStyles={{fontSize: 19, color: props.secondColor, fontWeight:'800'}}>
                    {props.title} 
                </RegularText>
                <RegularText textStyles={{fontSize: 19, color: props.secondColor, fontWeight:'800'}}>
                    {props.subtitle}
                   <Icon name="caret-down" color={props.secondColor} size={18} /> 
                </RegularText>
                </TransactionRow> 
            <TransactionItemFake />
        </TransactionSectionBackground>
    );
};  

export default TransactionSectionFake;