import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../Colors';
import SmallText from '../Texts/SmallText';
import { Dimensions, GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from "react-native";

const StyledPressable = styled.Pressable`
    align-self: center;
    padding-vertical: 5px;
`;

interface PressableProps{
    btnStyles?: StyleProp<ViewStyle>;
    onPress?: ((event:GestureResponderEvent) => void | undefined);
    textStyles?: StyleProp<TextStyle>;
    children: React.ReactNode;
    disabled?: boolean | null | undefined;
}


const PressableText: React.FC<PressableProps> = (props) => {
    return(
        <StyledPressable onPress={props.onPress} style={props.btnStyles} disabled={props.disabled}>
            <SmallText textStyles={props.textStyles} >{props.children}</SmallText>
        </StyledPressable>)
    ;
};  

export default PressableText;