import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styled from 'styled-components/native';
import { Colors } from '../Colors';

import { StyleProp
        ,TextStyle        
        ,NativeSyntheticEvent,
        View,
        TextInputFocusEventData,
        ViewStyle,
        TouchableOpacity,
        StyleSheet,
        Dimensions
     } from "react-native";
import SmallText from '../Texts/SmallText';

const StyledTextInput = styled.TextInput`
    padding: 15px;
    padding-left: 15px;
    padding-right: 55px;
    border-radius: 10px;
    font-size: 16px ;
    height: 50px;
    margin-top: 3px;
    margin-bottom: 10px;
    color: ${Colors.Background};
    border-color: ${Colors.Background};
    border-width: 1px;
`;

const LeftIcon = styled.View`
    position: absolute;
    top: 35px;
    left:15px;
    z-index: 1;
    border-right-width: 1px;
    border-color:  ${Colors.Background};
    padding-right: 10px;
`;

const RightIcon = styled.TouchableOpacity`
    position: absolute;
    top: 35px;
    right:15px;
    z-index: 1;
`;

interface InputProps{
    ViewStyles?: StyleProp<ViewStyle>;
    textStyles?: StyleProp<TextStyle>;
    inputStyles?: StyleProp<TextStyle>;
    titleStyle?: StyleProp<TextStyle>;
    iconStyles?: StyleProp<ViewStyle>;
    onBlur?:  ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined;
    placeholder?: string | undefined,
    placeholderColor?: string | undefined,
    title?: string,
    iconeName?: string,
    iconeColor?: string,
    ShowMenu?: boolean | undefined;
    onPressMenu?: () => void;
    editable?: boolean;
}

const DocumentoInput: React.FC<InputProps> = (props) => {
    return(
                <View style={props.ViewStyles}>
                    <SmallText textStyles={props.titleStyle}>{props.title}</SmallText>
                    <StyledTextInput 
                        onBlur={props.onBlur}
                        style={props.inputStyles} 
                        placeholder={props.placeholder} 
                        editable={props.editable}
                        placeholderTextColor={props.placeholderColor}
                    />
                    {props.ShowMenu && (
                        <RightIcon onPress={props.onPressMenu}>
                            <Icon name={props.iconeName as string} size={30} color={props.iconeColor} />
                        </RightIcon>
                    )}
                </View>            
        )
    ;
};  

export default DocumentoInput;