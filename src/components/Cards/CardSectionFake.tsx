import React from 'react';
import { CardBackgroundF } from './CardItem.s';

//import card_bd from "../../assets/images/background_transparent.png";
import RegularText from '../Texts/RegularText';
import { View } from 'react-native';
import SmallText from '../Texts/SmallText';
import Icon from 'react-native-vector-icons/Ionicons';
import BigText from '../Texts/BigText';

type CardItemType = {
    primaryColor: string;
    secondColor: string;
}

const CardSectionFake: React.FC<CardItemType> = (props) => {

    return(
        <CardBackgroundF style={{backgroundColor: props.secondColor}}>
            <BigText>Sem Agendamento</BigText>
        </CardBackgroundF>
    );
};  

export default CardSectionFake;