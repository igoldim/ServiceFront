import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components/native';
import { Colors } from '../Colors';
import BigText from '../Texts/BigText';
import RegularText from '../Texts/RegularText';
import { GestureResponderEvent, Modal, StyleProp, TextStyle, ViewStyle } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RegularButton from '../Buttons/RegularButton';
import { useAppData } from '../../services';


const ModalPressableContainer = styled.Pressable`
    flex: 1;
    padding: 25px;
    background-color: rgba(0, 0, 0, 0.7);
    justify-content: center;
    align-items: center;
`;

const ModalView = styled.View`
    border-radius: 20px;
    width: 100%;
    padding: 20px;
    align-items: center;
    /*elavation: 5;
    shadow-color: ${Colors.Black};
    shadown-offset: 0px 2px;
    shadownOpacity: 0.25;
    shadown-radius: 4px;*/
`;

interface ButtonProps{
    onPress: () => void;
    textStyles?: StyleProp<TextStyle>;
    children?: React.ReactNode;
    visible?:boolean | undefined;
    heading: string;
    message: string;
    type: string;
    primaryColor: string;
    secondColor: string;
}


const MessageAlertModal: React.FC<ButtonProps> = (props) => {

    return(
        <Modal animationType='slide' visible={props.visible} transparent={true}>
            <ModalPressableContainer>
                <ModalView style={{backgroundColor: props.secondColor}}>
                    <Icon 
                        name={props.type == 'success' ? 'check-circle' : 'close-circle'} 
                        color={props.primaryColor} size={100}
                        />
                        <BigText textStyles={{fontSize: 25, color: props.primaryColor, marginVertical:10, fontWeight:'600'}} >{props.heading}</BigText>
                        <RegularText textStyles={{color: props.primaryColor, marginVertical:10, fontWeight:'600'}}>{props.message}</RegularText>
                        <RegularButton 
                            onPress={props.onPress} 
                            btnStyles={{backgroundColor: props.primaryColor, marginTop: 10}}
                            textStyles={{color: props.secondColor}}>Fechar</RegularButton>
                </ModalView>

            </ModalPressableContainer>
            {props.children}
        </Modal>
    );
};  

export default MessageAlertModal;