import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

import { StyleProp
        ,TextStyle        
        ,NativeSyntheticEvent,
        KeyboardTypeOptions,
        TextInputFocusEventData,
        ViewStyle
     } from "react-native";
import SmallText from '../Texts/SmallText';

const StyledView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content:space-between ;
    width: 100%;
    border-radius: 4px;
    height: 42px;
    margin-top: 30px;
    margin-bottom: 20px;
    padding: 4px;
`;


const LeftIcon = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    width: 35px;
    height: 35px;
`;


const StyledTextInput = styled.TextInput`
    padding: 5px;
    border-radius: 4px;
    font-size: 10px;
    width: 76%;
`;

const RightIcon = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    width: 35px;
    height: 35px;
`;

interface InputProps{
    ViewStyles?: StyleProp<ViewStyle>;
    textStyles?: StyleProp<TextStyle>;
    inputStyles?: StyleProp<TextStyle>;
    titleStyle?: StyleProp<TextStyle>;
    iconStyles?: StyleProp<ViewStyle>;
    onChangeText?: ((text: string) => void) | undefined;
    onBlur?:  ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined;
    placeholder?: string | undefined,
    placeholderColor?: string | undefined,
    keyboardType?: KeyboardTypeOptions | undefined,
    maxLength?: number | undefined;
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined,
    iconeName?: string,
    iconeColor?: string,
    value?: string | undefined;
    isPassword?: boolean | undefined;
    onSearchButton: () => void;
    onLocationhButton: () => void;
}

const SearchInput: React.FC<InputProps> = (props) => {
    return(<StyledView style={props.ViewStyles}>
            <LeftIcon style={props.iconStyles} onPress={props.onSearchButton}>
                <Icon name={'search'} size={30} color={props.iconeColor} />
            </LeftIcon>
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
            />
            <RightIcon  style={props.iconStyles}  onPress={props.onLocationhButton}>
                <Icon name={'my-location'} size={30} color={props.iconeColor} />
            </RightIcon>
          </StyledView>
        )
    ;
};  

export default SearchInput;