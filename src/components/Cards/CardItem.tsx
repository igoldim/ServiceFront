import React from 'react';
import { Avatar, CardBackground, CardRow, CardTouchable, TouchableView } from './CardItem.s';

//import card_bd from "../../assets/images/background_transparent.png";
import RegularText from '../Texts/RegularText';
import { View } from 'react-native';
import SmallText from '../Texts/SmallText';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalScheduling from '../Modals/ModalScheduling';
import { Users } from '../../types/AppType';

type CardItemType = {
    item: Users,
    primaryColor: string;
    secondColor: string;
}

const CardItem: React.FC<CardItemType> = (props) => {

    const [visibleScheduling , setVisibleScheduling ] = React.useState(false);
    const [messageModalScheduling , setMessageModalScheduling ] = React.useState(''); //Email Validado com sucesso!
    const [item , setItem ] = React.useState<Users>();
    const [messageHeaddingScheduling , setMessageHeaddingScheduling ] = React.useState('');
    const [modalButtonTextScheduling , setmodalButtonTextScheduling ] = React.useState('');     

    const showModalScheduling  = (value : Users) => {
        setItem(value);
        setVisibleScheduling(true);
    }

    return(
        <CardBackground style={{backgroundColor: props.secondColor}}  >
            <CardTouchable underlayColor={props.secondColor} onPress={() => showModalScheduling(props.item)}>
                <TouchableView>
                 <CardRow style={{marginBottom:5}}>
                    <RegularText textStyles={{color: props.primaryColor, fontSize: 18, fontWeight: '600'}}>
                        <Icon name="calendar" color={props.primaryColor} size={18}/> 
                        {" " + props.item.scheduleDate}
                    </RegularText>    
                    <RegularText textStyles={{color: props.primaryColor, fontSize: 18, fontWeight: '600'}}>
                        <Icon name="time" color={props.primaryColor} size={18}/> 
                        {" " + props.item.scheduleTime}
                    </RegularText>    
                 </CardRow>
                 <CardRow style={{marginBottom:2}}>
                    <RegularText textStyles={{color: props.primaryColor, fontSize: 18, fontWeight: '600'}}>
                        {props.item.userName}
                    </RegularText>   
                 </CardRow>   
                 <CardRow>
                    <View style={{flex: 3}}>
                        <SmallText textStyles={{fontSize: 11, color: props.primaryColor}}>
                            {props.item.userAddress}
                        </SmallText>
                        <SmallText textStyles={{fontSize: 11, color: props.primaryColor}}>
                            {props.item.userAddressDistrict}
                        </SmallText>
                        <SmallText textStyles={{fontSize: 11, color: props.primaryColor}}>
                            {props.item.userAddressCity}, {props.item.userAddressState}
                        </SmallText>
                        <SmallText textStyles={{fontSize: 11, color: props.primaryColor}}>
                            {props.item.userAddressComplement}
                        </SmallText>
                    </View>
                    <Avatar source={{uri: props.item.userImage as string}} style={{backgroundColor: props.primaryColor}}  />
                 </CardRow>   
                </TouchableView>
            </CardTouchable>
            <ModalScheduling 
                item= {props.item}
                visible={visibleScheduling} 
                onPress={() => setVisibleScheduling(false)} 
                onPressTransaction={() => {}}
                secondColor={props.secondColor}
                primaryColor={props.primaryColor}
                />
        </CardBackground>
    );
};  

export default CardItem;