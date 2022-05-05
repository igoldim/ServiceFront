import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../Colors';
import RegularText from '../Texts/RegularText';
import { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from "react-native";

const ButtonView = styled.TouchableOpacity`
    align-items: center;
    background-color: ${Colors.Orange};
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    height: 50px;
`;

interface ButtonProps{
    btnStyles?: StyleProp<ViewStyle>;
    onPress?: ((event:GestureResponderEvent) => void | undefined);
    textStyles?: StyleProp<TextStyle>;
    children: React.ReactNode;
}


const RegularButton: React.FC<ButtonProps> = (props) => {
    return(
        <ButtonView onPress={props.onPress} style={props.btnStyles}>
            <RegularText textStyles={props.textStyles} >{props.children}</RegularText>
        </ButtonView>)
    ;
};  

export default RegularButton;