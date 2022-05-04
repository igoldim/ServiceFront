import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../Colors';
import RegularText from '../Texts/RegularText';
import { TextInputChangeEventData
        ,StyleProp
        ,TextStyle
        ,ViewStyle
        ,NativeSyntheticEvent
     } from "react-native";

const TextInput = styled.TextInput`
    align-items: center;
    background-color: ${Colors.Orange};
    width: 100%;
    padding: 20px;
    border-radius: 20px;
`;

interface InputProps{
    inputStyles?: StyleProp<ViewStyle>;
    onChange: ((event:NativeSyntheticEvent<TextInputChangeEventData>) => void | undefined);
    textStyles?: StyleProp<TextStyle>;
    children: React.ReactNode;
}


const RegularInput: React.FC<InputProps> = (props) => {
    return(
        <>
            <RegularText textStyles={props.textStyles} >{props.children}</RegularText>
            <TextInput onChange={props.onChange} style={props.inputStyles} />
        </>
        )
    ;
};  

export default RegularInput;