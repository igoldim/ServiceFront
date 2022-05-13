import React from 'react';
import { Colors } from '../Colors';
import { Avatar, CardBackground, CardRow, CardTouchable, TouchableView } from './CardItem.s';
import { CardProps } from './CardSection.t';

import card_bd from "../../assets/images/background_transparent.png";
import RegularText from '../Texts/RegularText';
import { View } from 'react-native';
import SmallText from '../Texts/SmallText';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalScheduling, { Users } from '../Modals/ModalScheduling';



const CardItem: React.FC<Users> = (props) => {

    const [visibleScheduling , setVisibleScheduling ] = React.useState(false);
    const [messageModalScheduling , setMessageModalScheduling ] = React.useState(''); //Email Validado com sucesso!
    const [item , setItem ] = React.useState(null);
    const [messageHeaddingScheduling , setMessageHeaddingScheduling ] = React.useState('');
    const [modalButtonTextScheduling , setmodalButtonTextScheduling ] = React.useState('');     

    const showModalScheduling  = (value : any) => {
        setItem(value);
        setVisibleScheduling(true);
    }

    return(
        <CardBackground source={card_bd} >
            <CardTouchable underlayColor={Colors.Salmon} onPress={() => showModalScheduling(props)}>
                <TouchableView>
                 <CardRow style={{marginBottom:5}}>
                    <RegularText textStyles={{color: Colors.White}}>
                        <Icon name="calendar" color={Colors.White} size={13}/> 
                        {" " + props.scheduleDate}
                    </RegularText>    
                    <RegularText textStyles={{color: Colors.White}}>
                        <Icon name="time" color={Colors.White} size={13}/> 
                        {" " + props.scheduleTime}
                    </RegularText>    
                 </CardRow>
                 <CardRow style={{marginBottom:2}}>
                    <RegularText textStyles={{color: Colors.White, fontSize: 15}}>
                        {props.userName}
                    </RegularText>   
                 </CardRow>   
                 <CardRow>
                    <View style={{flex: 3}}>
                        <SmallText textStyles={{fontSize: 10}}>
                            {props.userAddress}
                        </SmallText>
                        <SmallText textStyles={{fontSize: 10}}>
                            {props.userAddressDistrict}
                        </SmallText>
                        <SmallText textStyles={{fontSize: 10}}>
                            {props.userAddressCity}, {props.userAddressState}
                        </SmallText>
                        <SmallText textStyles={{fontSize: 10}}>
                            {props.userAddressComplement}
                        </SmallText>
                    </View>
                    <Avatar source={props.userImage} />
                 </CardRow>   
                </TouchableView>
            </CardTouchable>
            <ModalScheduling 
                item= {props}
                visible={visibleScheduling} 
                onPress={() => setVisibleScheduling(false)} 
                onPressTransaction={() => {}}
                />
        </CardBackground>
    );
};  

export default CardItem;