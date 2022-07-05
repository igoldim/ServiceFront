import React from 'react';
import { Image, StatusBar, StyleProp, ViewStyle } from 'react-native';
import BigText from "../Texts/BigText";
import RegularText from '../Texts/RegularText';
import { Container, IconImg, Line, StyledView } from "./ScreenHeadUser.s";

type Props = {
    primaryColor: string;
    secondColor: string;
    userName: string;
    onPress?: () => void | undefined | null;
    showIcon?: boolean;
    avatar?: string;
    headStyle?: StyleProp<ViewStyle>;
}



const ScreenHeadUser: React.FC<Props> = ({userName, primaryColor, secondColor, onPress, showIcon = false, avatar= 'https://imagens.circuit.inf.br/noAvatar.png', headStyle}) => {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={primaryColor} />
            <Container style={headStyle}>
                <StyledView>                
                    <BigText textStyles={{color: secondColor, fontSize: 30, fontWeight: '800'}}>Olá, {userName}</BigText> 
                    <RegularText textStyles={{color: secondColor, fontSize: 18, fontWeight: '400', marginBottom:20}}>Que bom ter você de volta!</RegularText> 
                </StyledView>
                <StyledView>
                    <IconImg style={{backgroundColor: secondColor}} onPress={onPress}>
                        <Image source={{uri: avatar, width: 42, height:42}}/>
                    </IconImg>
                </StyledView>                             
            </Container>
        </>
    );
};

export default ScreenHeadUser;