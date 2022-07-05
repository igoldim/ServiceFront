import React from 'react';
import styled from 'styled-components/native';
import { ScreenWidth } from '../Shared';

import {StyleProp
        ,TextStyle        
        ,NativeSyntheticEvent,
        KeyboardTypeOptions,
        View,
        TextInputFocusEventData,
        ViewStyle
     } from "react-native";

const StyledView = styled.View`
     width: ${ScreenWidth * 0.88}px;
     border-radius: 10px;
     font-size: 16px ;
     border-width: 1px;
 `;
 

const StyledTextInput = styled.TextInput`
    width: 100%;
    font-size: 16px ;
`;


interface InputProps{
    ViewStyles?: StyleProp<ViewStyle>;
    inputStyles?: StyleProp<TextStyle>;
    onChangeText?: ((text: string) => void) | undefined;
    onBlur?:  ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined;
    placeholder?: string | undefined,
    placeholderColor?: string | undefined,
    keyboardType?: KeyboardTypeOptions | undefined,
    maxLength?: number | undefined;
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined,
    value?: string | undefined;
    isPassword?: boolean | undefined;
    multiline?: boolean;
    numberOfLines?: number;
}

const RegularInputArea: React.FC<InputProps> = (props) => {
    const [hidePassword, setHidePassword] = React.useState(true);

    return(<View style={props.ViewStyles}>           
            <StyledTextInput 
                onChangeText={props.onChangeText}
                onBlur={props.onBlur}
                style={props.inputStyles} 
                placeholder={props.placeholder} 
                placeholderTextColor={props.placeholderColor}
                keyboardType={props.keyboardType}
                maxLength={props.maxLength}
                autoCapitalize={props.autoCapitalize}
                value={props.value}         
                multiline={props.multiline}     
                numberOfLines={props.numberOfLines}    
                secureTextEntry={props.isPassword && hidePassword}    
            />
          </View>
        )
    ;
};  

export default RegularInputArea;