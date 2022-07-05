import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../Colors';

import { StyleProp
        ,ViewStyle
     } from "react-native";

const CodeInputSection = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-vertical: 35px;
`;

const HiddenTextInput = styled.TextInput`
    position: absolute;
    width:1px;
    height: 1px;
    opacity: 0;
`;

const CodeInputContainer = styled.Pressable`
    width: 70%;
    flex-direction: row;
    justify-content: space-between;
`;

interface InputProps{
    viewStyles?: StyleProp<ViewStyle>;
    maxLength?: number | undefined;
    setCode?:  ((text: string) => void) | undefined;
    code?: string | undefined;
    setPinRead?: any | undefined;
    primaryColor?: string;
    secondColor?: string;
}

const CodeInput: React.FC<InputProps> = (props) => {
    const [inputContaierIsFocused, setInputContaierIsFocused] = React.useState(false);

    const codeDigitsArray = new Array(props.maxLength).fill(0);

    const textInputRef = React.useRef(null);
    
    const handleOnPress = () =>{
        setInputContaierIsFocused(true);
        textInputRef?.current?.focus();        
    };

    const handleOnSubmitEditing = () =>{
        setInputContaierIsFocused(false);
    };
    
    const CodeInputView = styled.View`
        min-width: 15%;
        padding: 12px;
        border-bottom-width: 5px;
        border-radius: 10px;
        border-color: ${props.secondColor};
    `;

    const CodeInputText = styled.Text`
        font-size: 22px;
        font-weight: bold;
        text-align: center;
        color:${props.secondColor};
    `;

    const CodeInputFocused = styled(CodeInputView)`
        border-color: ${props.secondColor};
        opacity: 0.7;
    `;


    const toCodeDigitsInput = (value, index) => {
        const emptyInputChar = ' ';
        const digit = props?.code[index] || emptyInputChar;

        const isCurrentDigit = index === props?.code.length;
        const isLastDigit = index === props?.maxLength-1;
        const isCodeFull = props?.code?.length === props.maxLength;

        const isDigiteFocused = isCurrentDigit || (isLastDigit && isCodeFull);


        const StyledCodeInput = inputContaierIsFocused && isDigiteFocused ? CodeInputFocused : CodeInputView; 

        return(
            <StyledCodeInput key={index}>
                <CodeInputText>{digit}</CodeInputText>
            </StyledCodeInput>
        )
    };
    

    React.useEffect(() =>{
        props.setPinRead(props.code?.length === props.maxLength);
        return () => props.setPinRead(false);
    }, [props.code]);

    return(
        <CodeInputSection>
            <CodeInputContainer onPress={handleOnPress}>
                { codeDigitsArray.map(toCodeDigitsInput)}
            </CodeInputContainer>
            <HiddenTextInput 
                keyboardType='number-pad'
                returnKeyType='done'
                textContentType='oneTimeCode'
                ref={textInputRef}
                value={props.code}
                onChangeText={props.setCode}   
                maxLength={props.maxLength}
                onSubmitEditing={handleOnSubmitEditing}         
            />
          </CodeInputSection>
        );
};  

export default CodeInput;