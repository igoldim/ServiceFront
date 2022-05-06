import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components/native';
import { Colors } from '../Colors';
import BigText from '../Texts/BigText';
import RegularText from '../Texts/RegularText';
import { GestureResponderEvent, Modal, StyleProp, TextStyle, ViewStyle } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RegularButton from '../Buttons/RegularButton';


const ModalPressableContainer = styled.Pressable`
    flex: 1;
    padding: 25px;
    background-color: rgba(0, 0, 0, 0.7);
    justify-content: center;
    align-items: center;
`;

const ModalView = styled.View`
    background-color: ${Colors.Background};
    border-radius: 20px;
    width: 100%;
    padding: 30px;
    align-items: center;
    /*elavation: 5;
    shadow-color: ${Colors.Black};
    shadown-offset: 0px 2px;
    shadownOpacity: 0.25;
    shadown-radius: 4px;*/
`;

interface ButtonProps{
    btnStyles?: StyleProp<ViewStyle>;
    onPress?: ((event:GestureResponderEvent) => void | undefined);
    textStyles?: StyleProp<TextStyle>;
    children?: React.ReactNode;
    visible?:boolean | undefined;
    type: string;
    heading: string;
    message: string;
    btnTitle: string;
}


const MessageModal: React.FC<ButtonProps> = (props) => {
    return(
        <Modal animationType='slide' visible={props.visible} transparent={true}>
            <ModalPressableContainer>
                <ModalView>
                    <Icon 
                        name={props.type === 'success' ? 'check-circle' : 'close-circle'} 
                        color={props.type === 'success' ? Colors.Green : Colors.Red} size={100}
                        />
                        <BigText textStyles={{fontSize: 25, color: Colors.Gray, marginVertical:10}} >{props.heading}</BigText>
                        <RegularText>{props.message}</RegularText>
                        <RegularButton onPress={props.onPress} btnStyles={{backgroundColor: Colors.DarkGray, marginTop: 10}}>{props.btnTitle || `Complete`}</RegularButton>
                </ModalView>

            </ModalPressableContainer>
            {props.children}
        </Modal>
    );
};  

export default MessageModal;