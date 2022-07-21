import React from 'react';
import { Avatar, CardBackground, CardRow, CardTouchable, TouchableView } from './CardItem.s';

//import card_bd from "../../assets/images/background_transparent.png";
import RegularText from '../Texts/RegularText';
import { Alert, View } from 'react-native';
import SmallText from '../Texts/SmallText';
import Icon from 'react-native-vector-icons/Ionicons';
import { TServices, TUser } from '../../types/AppType';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

type CardItemType = {
    item: TServices,
    primaryColor: string;
    secondColor: string;
}

const CardItem: React.FC<CardItemType> = (props) => {

    const navigation = useNavigation();

    const handleDetails = async () => {

        await AsyncStorage.setItem("serviceId", props.item.id);

        navigation.reset({
            index: 1,
            routes: [
            { name: "ScheduleDatailsProvider" },
            ],
        });

    }

    return(
        <CardBackground style={{backgroundColor: props.secondColor}}  >
            <CardTouchable underlayColor={props.secondColor} onPress={handleDetails}>
                <TouchableView>
                 <CardRow style={{marginBottom:5}}>
                    <RegularText textStyles={{color: props.primaryColor, fontSize: 18, fontWeight: '600'}}>
                        <Icon name="calendar" color={props.primaryColor} size={18}/> 
                        {props.item.schedule && " " + props.item.schedule.scheduleDateTime.split("T")[0]}
                    </RegularText>    
                    <RegularText textStyles={{color: props.primaryColor, fontSize: 18, fontWeight: '600'}}>
                        <Icon name="time" color={props.primaryColor} size={18}/> 
                        {props.item.schedule && " " + props.item.schedule.scheduleDateTime.split("T")[1]}
                    </RegularText>    
                 </CardRow>
                 <CardRow style={{marginBottom:2}}>
                    
                    {props.item.user &&
                        <RegularText textStyles={{color: props.primaryColor, fontSize: 18, fontWeight: '600'}}>
                            {props.item.user.name}
                        </RegularText>  
                    } 

                    {props.item.proffisional &&
                        <RegularText textStyles={{color: props.primaryColor, fontSize: 18, fontWeight: '600'}}>
                            {props.item.proffisional.name}
                        </RegularText>  
                    } 
                 </CardRow>   
                 <CardRow>
                    {props.item.user &&
                        <View style={{flex: 3}}>
                            <SmallText textStyles={{fontSize: 14, color: props.primaryColor}}>
                                {props.item.user.address} {props.item.user.number && ', ' + props.item.user.number}
                            </SmallText>
                            <SmallText textStyles={{fontSize: 14, color: props.primaryColor}}>
                                {props.item.user.district}
                            </SmallText>
                            <SmallText textStyles={{fontSize: 14, color: props.primaryColor}}>
                                {props.item.user.city}, {props.item.user.state}
                            </SmallText>
                            <SmallText textStyles={{fontSize: 14, color: props.primaryColor}}>
                                {props.item.user.complement}
                            </SmallText>
                        </View>
                    }
                    {props.item.proffisional &&
                        <View style={{flex: 3}}>
                            <SmallText textStyles={{fontSize: 14, color: props.primaryColor}}>
                                {props.item.proffisional.address}{props.item.proffisional.number && ', ' + props.item.proffisional.number}
                            </SmallText>
                            <SmallText textStyles={{fontSize: 14, color: props.primaryColor}}>
                                {props.item.proffisional.district}
                            </SmallText>
                            <SmallText textStyles={{fontSize: 14, color: props.primaryColor}}>
                                {props.item.proffisional.city}, {props.item.proffisional.state}
                            </SmallText>
                            <SmallText textStyles={{fontSize: 14, color: props.primaryColor}}>
                                {props.item.proffisional.complement}
                            </SmallText>
                        </View>
                    }
                    {props.item.user &&
                        <Avatar 
                            source={{uri: props.item.user.avatar ? props.item.user.avatar + '?'+Math.random().toString(36).substring(9) : 'https://imagens.circuit.inf.br/noAvatar.png'}} 
                            style={{backgroundColor: props.primaryColor, borderRadius: 100, width: 40, height: 45}}  
                        />
                    }
                    {props.item.proffisional &&
                        <Avatar 
                            source={{uri: props.item.proffisional.avatar ? props.item.proffisional.avatar + '?'+Math.random().toString(36).substring(9) : 'https://imagens.circuit.inf.br/noAvatar.png'}} 
                            style={{backgroundColor: props.primaryColor, borderRadius: 100}}  
                        />
                    }
                 </CardRow>   
                </TouchableView>
            </CardTouchable>           
        </CardBackground>
    );
};  

export default CardItem;