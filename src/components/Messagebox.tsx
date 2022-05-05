
import React, { Key, Ref } from 'react';
import styled from 'styled-components/native';
import { Colors } from './Colors';  
import { StyleProp, TextInputAndroidProps, TextInputIOSProps, TextStyle } from 'react-native';

type props = {
   textStyle?: StyleProp<TextStyle>; 
   textProps?: TextInputAndroidProps | TextInputIOSProps | undefined;    
   children: React.ReactNode;
   success: boolean;
}

const Messagebox: React.FC<props> = (props)  => {

    const StyledText = styled.Text`
        font-size: 13px;
        color: ${props.success ? Colors.Green : Colors.Red};
        text-align: center;
    `;    
    
    return (<StyledText  style={props.textStyle}>{props.children}</StyledText>);
};  

export default Messagebox;