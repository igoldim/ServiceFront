import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components/native';
import { Colors } from '../Colors';
import BigText from '../Texts/BigText';
import RegularText from '../Texts/RegularText';
import { GestureResponderEvent, ImageSourcePropType, Modal, StyleProp, TextStyle, ViewStyle } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

import RegularButton from '../Buttons/RegularButton';
import { Row } from '../Shared';

import avi from '../../assets/images/maps.jpeg';
import { Image } from 'react-native-svg';

const ModalPressableContainer = styled.Pressable`
    flex: 1;
    padding: 1px;
    background-color: rgba(0, 0, 0, 0.7);
    justify-content: center;
    align-items: center;
`;


const ModalClose = styled.Pressable``;

const ModalView = styled.View`
    background-color: ${Colors.Background};
    border-radius: 10px;
    width: 96%;
    height: 98%;
    padding: 5px;
    align-items: center;
    /*elavation: 5;
    shadow-color: ${Colors.Black};
    shadown-offset: 0px 2px;
    shadownOpacity: 0.25;
    shadown-radius: 4px;*/
`;


const ModalHead = styled.View`
    flex-direction: row;
    justify-content: space-between;
    background-color: ${Colors.Background};
    width: 100%;
    height: 60px;
    padding: 10px;
    align-items: center;
`;

export const StyledImage = styled.Image`
    resize-mode: cover;
    width: 100%;
    height: 100%;
    border-radius: 10px;    
`;

interface ButtonProps{
    item : Users;
    btnStyles?: StyleProp<ViewStyle>;
    onPress?: ((event:GestureResponderEvent) => void | undefined);
    textStyles?: StyleProp<TextStyle>;
    children?: React.ReactNode;
    visible?:boolean | undefined;
    heading?: string | undefined;
    message?: string | undefined;
    onPressTransaction?: ((event:GestureResponderEvent) => void | undefined);
}

export type Users =  {
    id: string,
    userName: string,
    userAddress: string,
    userAddressDistrict: string,
    userAddressCity: string,
    userAddressState: string,
    userAddressComplement: string,
    scheduleDate: string,
    scheduleTime: string,
    amount: string,
    userImage: ImageSourcePropType
}


const ModalScheduling: React.FC<ButtonProps> = (props) => {
    return(
        <Modal
            animationType='slide'
            visible={props.visible!}>
            <ModalPressableContainer>
                <ModalView>
                    <ModalHead>
                        <ModalClose onPress={props.onPress}>
                            <Icon 
                                name='arrow-back' 
                                color={Colors.White} size={25}
                                />
                        </ModalClose>
                    </ModalHead>
                    <Row>
                        <RegularButton btnStyles={{marginTop: 5, marginBottom: 5, width: '45%', backgroundColor: Colors.Green}} onPress={props.onPressTransaction}>Inciar</RegularButton>
                        <RegularButton btnStyles={{marginTop: 5, marginBottom: 5, width: '45%', backgroundColor: Colors.Red}} onPress={props.onPressTransaction}>Cancelar</RegularButton>
                    </Row>
                    <Row style={{marginTop: 10}}>
                        <RegularText textStyles={{fontSize: 25, color: Colors.Salmon, fontWeight: 'bold'}} >Data</RegularText>
                        <RegularText textStyles={{fontSize: 25, color: Colors.Salmon, fontWeight: 'bold'}} >Hora</RegularText>
                    </Row>
                    <Row>
                        <RegularText textStyles={{fontSize: 18, color: Colors.White}} > {props.item && props.item.scheduleDate}</RegularText>
                        <RegularText textStyles={{fontSize: 18, color: Colors.White}} > {props.item && props.item.scheduleTime}</RegularText>
                    </Row>
                    <Row style={{width: '100%'}}>
                        <BigText textStyles={{textAlign: 'left', fontSize: 20, color: Colors.Salmon, marginVertical: 2, fontWeight: 'bold'}} >Cliente</BigText>
                        <BigText textStyles={{textAlign: 'left', fontSize: 20, color: Colors.Salmon, marginVertical: 2, fontWeight: 'bold'}} >Valor</BigText>
                    </Row>
                    <Row style={{width: '100%'}}>
                        <RegularText textStyles={{fontSize: 16, color: Colors.White}} >{props.item && props.item.userName.split(' ')[0] + ' ' + props.item.userName.split(' ')[props.item.userName.split(' ').length-1]}</RegularText>
                        <RegularText textStyles={{fontSize: 16, color: Colors.White}} >{props.item && props.item.amount}</RegularText>
                    </Row>
                    <Row style={{width: '100%'}}>
                        <BigText textStyles={{fontSize: 20, color: Colors.Salmon, marginVertical: 2, fontWeight: 'bold'}} >Endereço</BigText>
                    </Row>
                    <Row style={{width: '100%'}}>
                        <BigText textStyles={{fontSize: 16, color: Colors.White}} >{props.item && props.item.userAddress}</BigText>
                    </Row>
                    <Row style={{width: '100%'}}>
                        <BigText textStyles={{fontSize: 16, color: Colors.White}} >{props.item && props.item.userAddressDistrict}</BigText>
                    </Row>
                    <Row style={{width: '100%'}}>
                        <BigText textStyles={{fontSize: 16, color: Colors.White}} >{props.item && props.item.userAddressComplement}</BigText>
                    </Row>
                    <Row style={{width: '100%'}}>
                        <BigText textStyles={{fontSize: 16, color: Colors.White}} >{props.item && props.item.userAddressCity}{props.item && " / " + props.item.userAddressState}</BigText>
                    </Row>
                    <Row style={{width: '100%'}}>
                        <BigText textStyles={{fontSize: 20, color: Colors.Salmon, marginVertical: 10, fontWeight: 'bold'}} >Localização</BigText>
                    </Row>
                    <Row style={{width: '100%', backgroundColor: Colors.Cyan, height: '30%',  borderRadius: 10}}>
                        <StyledImage source={avi} />
                    </Row>
                    <RegularButton btnStyles={{marginTop: 10, marginBottom: 5, width: '45%', backgroundColor: Colors.Salmon}} onPress={props.onPressTransaction}>Rota</RegularButton>
                </ModalView>
            </ModalPressableContainer>
            {props.children}
        </Modal>
    );
};  

export default ModalScheduling;