import React from 'react';
import { TransactionAviProps } from './Transaction.t';

import Icon from 'react-native-vector-icons/Ionicons';
import { StyledView } from './TransactionAvi.s';
import { Colors } from '../Colors';
import SmallText from '../Texts/SmallText';


const TransactionAvi: React.FC<TransactionAviProps> = ( props ) => {
    return (
        <StyledView style={{backgroundColor: props.background}}>
            {props.icon && (
                <Icon name={props.icon} size={25} color={Colors.White} />
            )}
            {!props.icon && (
                <SmallText textStyles={{color: Colors.White }}>{props.texto}</SmallText>
            )}
        </StyledView>
    );
}

export default TransactionAvi;