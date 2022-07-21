import React from 'react';
import RegularText from '../Texts/RegularText';
import { TransactionList, TransactionRow, TransactionSectionBackground } from './Transaction.s';
import Icon from 'react-native-vector-icons/Ionicons';
import { TransactionSectionProps } from '../../interfaces';
import TransactionTakerItem from './TransactionTakerItem';

const TransactionSectionTaker: React.FC<TransactionSectionProps> = ( props ) => {
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
            <TransactionList data={props.data} 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{
                paddingBottom: 25
            }}
            onRefresh={props.onRefresh}
            refreshing={props.refreshing}
            keyExtractor={({ id }: any )=> id.toString()}
            renderItem={({ item }: any ) => <TransactionTakerItem {...item} primaryColor={props.primaryColor} secondColor={props.secondColor} />}
            />
        </TransactionSectionBackground>
    );
};  

export default TransactionSectionTaker;