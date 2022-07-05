import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAddress from 'react-native-vector-icons/SimpleLineIcons';

import styled from 'styled-components/native';
import { Colors } from '../Colors';

import { StyleProp
        ,TextStyle        
        ,NativeSyntheticEvent,
        KeyboardTypeOptions,
        View,
        TextInputFocusEventData,
        ViewStyle
     } from "react-native";
import SmallText from '../Texts/SmallText';

const StyledTextInput = styled.TextInput`
    padding: 15px;
    padding-left: 65px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px ;
    height: 55px;
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
    onChangeText?: ((text: string) => void) | undefined;
    onBlur?:  ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined;
    placeholder?: string | undefined,
    placeholderColor?: string | undefined,
    keyboardType?: KeyboardTypeOptions | undefined,
    maxLength?: number | undefined;
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined,
    title?: string,
    iconeName?: string,
    iconeColor?: string,
    value?: string | undefined;
    isPassword?: boolean | undefined;
    ShowMenu?: boolean | undefined;
    onPressMenu?: () => void;
    multiline?: boolean;
    numberOfLines?: number;
    editable?: boolean; 
}

const RegularInput: React.FC<InputProps> = (props) => {
    const [hidePassword, setHidePassword] = React.useState(true);

    return(<View style={props.ViewStyles}>
            <SmallText textStyles={props.titleStyle}>{props.title}</SmallText>
            <LeftIcon style={props.iconStyles}>
                <Icon name={props.iconeName as string} size={30} color={props.iconeColor} />
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
                multiline={props.multiline}     
                editable={props.editable}
                numberOfLines={props.numberOfLines}     
                secureTextEntry={props.isPassword && hidePassword}    
            />
            {props.isPassword && (
                <RightIcon onPress={()=>{
                    setHidePassword(!hidePassword); 
                }}>
                    <Icon name={hidePassword ? 'eye-off' : 'eye'} size={30} color={props.iconeColor} />
                </RightIcon>
            )}

            {props.ShowMenu && (
                <RightIcon onPress={props.onPressMenu}>
                    <IconAddress name={'options-vertical'} size={30} color={props.iconeColor} />
                </RightIcon>
            )}

          </View>
        )
    ;
};  

export default RegularInput;