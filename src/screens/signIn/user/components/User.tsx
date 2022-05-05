import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../../../../components/Colors';
import { Container } from '../../../../components/Shared';
import { RootStackParamList } from '../../../../components/Navigators/RootStack';
import { StackScreenProps } from '@react-navigation/stack';

import BigText from '../../../../components/Texts/BigText';
import SmallText from '../../../../components/Texts/SmallText';
import RegularButton from '../../../../components/Buttons/RegularButton';


const SpanBold = styled(SmallText)``;


const UserContainer = styled(Container)`
    background-color: ${Colors.Background};
    width: 100%;
    flex: 1;
`;

type props = StackScreenProps<RootStackParamList, "Welcome">;

const User: React.FC<props> = ({navigation})  => {
    return (
        <UserContainer>   
            <BigText textStyles={{marginTop:55, marginBottom:25}}>Bem vindo(a) usuário(a).</BigText>
            <SmallText textStyles={{width:"90%", marginTop:10, marginBottom:10}}>É muito bom ter você aqui, vamos dar início ao seu cadastramento.</SmallText>
            <SmallText textStyles={{width:"90%",marginBottom:10}}>Iremos conduzir você através de um passo a passo simples e intuitivo, 
            onde você preencherá os dados necessários para ser aceito em nossa plataforma. </SmallText>
            <SmallText textStyles={{width:"90%",marginBottom:15}}>Antes de inciarmos, você deve ler nosso <SpanBold textStyles={{color: Colors.Orange }}>termo de compromisso</SpanBold> e <SpanBold textStyles={{color: Colors.Orange }}>nossa politica de privacidade</SpanBold>.</SmallText>
            <SmallText textStyles={{width:"80%", marginBottom:25}}>Para inciar, basta clicar no botão abaixo.</SmallText>
            <RegularButton 
                textStyles={{color:Colors.Background}} 
                btnStyles={{width:"75%", marginBottom:25}} 
                onPress={()=>{navigation.navigate("Welcome")}}>Iniciar cadastro</RegularButton>           
            <SmallText textStyles={{width:"80%", marginBottom:25}}>Ou se já possui cadastro, basta clicar no botão abaixo.</SmallText>
            <RegularButton 
                textStyles={{color:Colors.White}} 
                btnStyles={{width:"75%", marginBottom:50, backgroundColor: Colors.DarkBlue}} 
                onPress={()=>{navigation.navigate("SignUp")}}>Entrar</RegularButton>           
        </UserContainer>
    );
};  

export default User;