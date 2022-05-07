import React from 'react';
import { Colors } from '../Colors';
import RegularText from '../Texts/RegularText';
import { TransactionRow, TransactionSectionBackground } from './Transaction.s';
import { TransactionSectionProps } from './Transaction.t';

import Icon from 'react-native-vector-icons/Ionicons';

const TransactionSection: React.FC<TransactionSectionProps> = ( props ) => {
    return (
        <TransactionSectionBackground>
            <TransactionRow style={{marginBottom: 25}}>
                <RegularText textStyles={{fontSize: 19, color: Colors.Salmon}}>
                   Serviços 
                </RegularText>
                <RegularText textStyles={{fontSize: 19, color: Colors.Salmon}}>
                   Recentes
                   <Icon name="caret-down" color={Colors.DarkGray} size={13} /> 
                </RegularText>
            </TransactionRow>        
        </TransactionSectionBackground>
    );
};  

export default TransactionSection;