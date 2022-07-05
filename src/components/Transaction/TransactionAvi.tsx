import React from 'react';
import { TransactionAviProps } from './Transaction.t';

import Icon from 'react-native-vector-icons/Ionicons';
import { StyledView } from './TransactionAvi.s';
import SmallText from '../Texts/SmallText';


const TransactionAvi: React.FC<TransactionAviProps> = ( props ) => {
    return (
        <StyledView style={{backgroundColor: props.secondColor}}>
            {props.icon && (
                <Icon name={props.icon} size={25} color={props.primaryColor} />
            )}
            {!props.icon && (
                <SmallText textStyles={{color: props.primaryColor }}>{props.texto}</SmallText>
            )}
        </StyledView>
    );
}

export default TransactionAvi;