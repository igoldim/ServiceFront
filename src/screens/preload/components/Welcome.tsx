import React from 'react';
import { Colors } from '../../../components/Colors';
import BigText from '../../../components/Texts/BigText';
import SmallText from '../../../components/Texts/SmallText';
import RegularButton from '../../../components/Buttons/RegularButton';

import backgraoundImage from "../../../assets/images/logo.png";
import { WelcomeProps } from './Welcome.t';
import { BottonSection, TopImage, TopSection, WelcomeContainer } from './Welcome.s';

const Welcome: React.FC<WelcomeProps> = ({navigation}) => {

    const [versao] = React.useState("0.0.022");

    return (
        <>           
            <WelcomeContainer>
                <TopSection>
                    <TopImage source={backgraoundImage} />
                </TopSection>
                <BottonSection>
                    <BigText textStyles={{width:"70%", marginBottom:25}}>The Cleaner App</BigText>
                    <SmallText textStyles={{width:"70%", marginBottom:25}}>Sistema de agendamento e exceução de diárias profissional.</SmallText>
                    <RegularButton textStyles={{color:Colors.Background}} btnStyles={{marginBottom:50}} onPress={()=>{navigation.navigate("Comecar")}}>Vamos começar!</RegularButton>
                        <SmallText textStyles={{color:Colors.White, textAlign:'center'}} >Versão {versao}</SmallText>
                </BottonSection>
            </WelcomeContainer>
        </>
    );
};  

export default Welcome;