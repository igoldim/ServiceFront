import React from 'react';

import styled from 'styled-components/native';

import { Container } from '../../../components/Shared';
import { Colors } from '../../../components/Colors';

import backgraoundImage from "../../../assets/images/logo.png";
import BigText from '../../../components/Texts/BigText';
import SmallText from '../../../components/Texts/SmallText';
import RegularButton from '../../../components/Buttons/RegularButton';

const WelcomeContainer = styled(Container)`
    background-color: ${Colors.Background};
    justify-content: space-between;
    width: 100%;
    height: 100%;
`;

const TopImage = styled.Image`
    width: 80%;
    height: 100%;   
    margin:0 auto ;
    resize-mode: stretch;
`;

const TopSection = styled.View`
    width: 100%;
    flex: 1;
    max-height: 60%;
    align-items: center;
`;

const BottonSection = styled.View`
    width: 100%;
    padding: 25px;
    flex: 1;
`;

import { RootStackParamList } from '../../../components/Navigators/RootStack';
import { StackScreenProps } from '@react-navigation/stack';

type props = StackScreenProps<RootStackParamList, "Welcome">;

const Welcome: React.FC<props> = ({navigation}) => {

    const [versao] = React.useState("0.0.0.002");

    return (
        <>           
            <WelcomeContainer>
                <TopSection>
                    <TopImage source={backgraoundImage} />
                </TopSection>
                <BottonSection>
                    <BigText textStyles={{width:"70%", marginBottom:25}}>The Cleaner App</BigText>
                    <SmallText textStyles={{width:"70%", marginBottom:25}}>Sistema de agendamento e exceução de diárias profissional.</SmallText>
                    <RegularButton textStyles={{color:Colors.Background}} btnStyles={{marginBottom:50}} onPress={()=>{navigation.navigate("SignIn")}}>Vamos começar!</RegularButton>
                    <SmallText textStyles={{color:Colors.White, textAlign:'center'}}>Build {versao}</SmallText>
                </BottonSection>
            </WelcomeContainer>
        </>
    );
};  

export default Welcome;