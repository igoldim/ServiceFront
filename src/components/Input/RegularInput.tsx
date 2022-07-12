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

const InputContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: ${Colors.Background};
    border-color: ${Colors.Background};
    border-radius: 5px;
    height: 60px;
    margin-bottom: 10px;
    margin-top: 5px;
`;
const LeftIcon = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-self: center;
    width: 15%;
    border-right-width: 1px;
    border-color:  ${Colors.Background};
    padding-right: 1px;
`;

const StyledTextInput = styled.TextInput`
    display: flex;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 14px ;
    text-align: left;
    width: 70%;
`;

const RightIcon = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-self: center;
    width: 15%;
    border-left-width: 1px;
    border-color:  ${Colors.Background};
    padding-right: 1px;

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

    return(<View>
            <SmallText textStyles={props.titleStyle}>{props.title}</SmallText>
            <InputContainer style={props.ViewStyles}>
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
            </InputContainer>
          </View>
        )
    ;
};  

export default RegularInput;