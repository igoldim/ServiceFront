import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AgendarItemProps } from '../../interfaces';
import RegularText from '../Texts/RegularText';
import Icon from 'react-native-vector-icons/Ionicons';

import TransactionAvi from '../Transaction/TransactionAvi';
import { LeftRow, RightRow, ListRowAgendar } from './StyledList.s';

const AgendarListItem: React.FC<AgendarItemProps> = ( props ) => {
    return (
        <ListRowAgendar>
            <LeftRow>
                <TransactionAvi primaryColor={props.primaryColor} secondColor={props.secondColor} icon='calendar'/>
                <View style={{marginLeft: 10}}>
                    <RegularText textStyles={{
                        color: props.secondColor,
                        textAlign: 'left',
                        marginBottom: 5,
                        fontWeight:'800'                    
                    }}>
                        {props.scheduleDateTime.split("T")[0]}
                    </RegularText>
                </View>
            </LeftRow>
            <RightRow>
                <RegularText textStyles={{
                        color: props.secondColor,
                        textAlign: 'left',
                        marginBottom: 5,
                        fontWeight:'800'                    
                    }}>
                        {props.scheduleDateTime.split("T")[1]}
                    </RegularText>
            </RightRow>
            <RightRow>
                <TouchableOpacity onPress={() => props.onPress(props)}>
                    <Icon name='arrow-forward' size={25} color={props.secondColor} />
                </TouchableOpacity>
            </RightRow>
        </ListRowAgendar>
    );
}

export default AgendarListItem;
