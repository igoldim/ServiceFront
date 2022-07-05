import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AgendaItemProps } from '../../interfaces';
import RegularText from '../Texts/RegularText';
import Icon from 'react-native-vector-icons/Ionicons';

import TransactionAvi from '../Transaction/TransactionAvi';
import { LeftRow, RightRow, ListRow } from './StyledList.s';

const ListItem: React.FC<AgendaItemProps> = ( props ) => {
    return (
        <ListRow>
            <LeftRow>
                <TransactionAvi primaryColor={props.primaryColor} secondColor={props.secondColor} icon='calendar' texto={props.scheduleDate.substring(0,2)}/>
                <View style={{marginLeft: 10}}>
                    <RegularText textStyles={{
                        color: props.secondColor,
                        textAlign: 'left',
                        marginBottom: 5,
                        fontWeight:'800'                    
                    }}>
                        {props.scheduleDate}
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
                        {props.scheduleTime}
                    </RegularText>
            </RightRow>
            <RightRow>
                <TouchableOpacity onPress={() => props.onPressEdit(props.id)}>                    
                    <Icon name='pencil' size={25} color={props.secondColor} />
                </TouchableOpacity>
            </RightRow>
            <RightRow>
                <TouchableOpacity onPress={() => props.onPressDelete(props.id)}>
                    <Icon name='trash' size={25} color={props.secondColor} />
                </TouchableOpacity>
            </RightRow>
        </ListRow>
    );
}

export default ListItem;
