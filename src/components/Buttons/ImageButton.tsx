import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RegularText from '../Texts/RegularText';
import { GestureResponderEvent, StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { Row } from '../Shared';

const ButtonView = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    padding: 10px;
    height: 60px ;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 10px;   
`;

const ImageView = styled.View`
    display:flex ;
    justify-content:center ;
    align-items: center;
    width: 30px;
    height: 30px;    
    background-color:"#333";
    border-radius: 5px;
    margin-right: 10px;
`;

interface ButtonProps{
    btnStyles?: StyleProp<ViewStyle>;
    ImageViewStyles?: StyleProp<ViewStyle>;
    onPress? : ((event: GestureResponderEvent) => void) | undefined;
    textStyles?: StyleProp<TextStyle>;
    children: React.ReactNode;
    disabled?:boolean | null | undefined;
    ImageViewName? : string;
    ImageViewColor? : string;
}



const ImageButton: React.FC<ButtonProps> = (props) => {
    return(
        <ButtonView onPress={props.onPress} style={props.btnStyles} disabled={props.disabled}>
            <Row style={{justifyContent:'flex-start'}}>
                <ImageView style={props.ImageViewStyles}>
                    <Icon name={props.ImageViewName as string}  color={props.ImageViewColor} size={22}/>
                </ImageView>
                <RegularText textStyles={props.textStyles} >{props.children}</RegularText>
            </Row>
        </ButtonView>)
    ;
};  

export default ImageButton;