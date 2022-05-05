import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import { Colors } from '../Colors';

import { TextInputChangeEventData
        ,StyleProp
        ,TextStyle        
        ,NativeSyntheticEvent,
        KeyboardTypeOptions,
        View,
        TextInputFocusEventData
     } from "react-native";
import SmallText from '../Texts/SmallText';

const StyledTextInput = styled.TextInput`
    background-color: ${Colors.Gray};
    padding: 15px;
    padding-left: 65px;
    padding-right: 55px;
    border-radius: 10px;
    font-size: 16px ;
    height: 50px;
    margin-top: 3px;
    margin-bottom: 10px;
    color: ${Colors.Background};
    border-color: ${Colors.Background};
    border-width: 2px;
`;

const LeftIcon = styled.View`
    position: absolute;
    top: 35px;
    left:15px;
    z-index: 1;
    border-right-width: 2px;
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
    textStyles?: StyleProp<TextStyle>;
    inputStyles?: StyleProp<TextStyle>;
    onChangeText?: ((text: string) => void) | undefined;
    onBlur?:  ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined;
    placeholder?: string | undefined,
    keyboardType?: KeyboardTypeOptions | undefined,
    maxLength?: number | undefined;
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined,
    title: string,
    iconeName: string,
    value?: string | undefined;
    isPassword?: boolean | undefined;
}

const RegularInput: React.FC<InputProps> = (props) => {
    const [hidePassword, setHidePassword] = React.useState(true);

    return(<View>
            <LeftIcon>
                <Icon name={props.iconeName} size={30} color={Colors.Background} />
            </LeftIcon>
            <SmallText>{props.title}</SmallText>
            <StyledTextInput 
                onChangeText={props.onChangeText}
                onBlur={props.onBlur}
                style={props.inputStyles} 
                placeholder={props.placeholder} 
                keyboardType={props.keyboardType}
                maxLength={props.maxLength}
                autoCapitalize={props.autoCapitalize}
                value={props.value}            
                secureTextEntry={props.isPassword && hidePassword}    
            />
            {props.isPassword && (
                <RightIcon onPress={()=>{
                    setHidePassword(!hidePassword); 
                }}>
                    <Icon name={hidePassword ? 'eye-off' : 'eye'} size={30} color={Colors.Background} />
                </RightIcon>
            )}
          </View>
        )
    ;
};  

export default RegularInput;