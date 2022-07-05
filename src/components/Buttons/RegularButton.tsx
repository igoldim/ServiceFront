import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../Colors';
import RegularText from '../Texts/RegularText';
import { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from "react-native";

const ButtonView = styled.TouchableOpacity`
    display:flex ;
    justify-content: center;
    align-items: center;
    background-color: ${Colors.Salmon};
    width: 100%;
    padding: 5px;
    height: 60px ;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

interface ButtonProps{
    btnStyles?: StyleProp<ViewStyle>;
    onPress? : ((event: GestureResponderEvent) => void) | undefined;
    textStyles?: StyleProp<TextStyle>;
    children: React.ReactNode;
    disabled?:boolean | null | undefined;
}



const RegularButton: React.FC<ButtonProps> = (props) => {
    return(
        <ButtonView onPress={props.onPress} style={props.btnStyles} disabled={props.disabled}>
            <RegularText textStyles={props.textStyles} >{props.children}</RegularText>
        </ButtonView>)
    ;
};  

export default RegularButton;