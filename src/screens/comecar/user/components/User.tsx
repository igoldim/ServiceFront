import React from 'react';
import { Colors } from '../../../../components/Colors';
import BigText from '../../../../components/Texts/BigText';
import SmallText, { SpanBold } from '../../../../components/Texts/SmallText';
import RegularButton from '../../../../components/Buttons/RegularButton';
import { UserProps } from './User.t';
import { UserContainer } from './User.s';

const User: React.FC<UserProps> = ({navigation})  => {
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
                onPress={()=>{navigation.navigate("SignUp")}}>Iniciar cadastro</RegularButton>           
            <SmallText textStyles={{width:"80%", marginBottom:25}}>Ou se já possui cadastro, basta clicar no botão abaixo.</SmallText>
            <RegularButton 
                textStyles={{color:Colors.White}} 
                btnStyles={{width:"75%", marginBottom:50, backgroundColor: Colors.DarkBlue}} 
                onPress={()=>{navigation.navigate("SignIn")}}>Entrar</RegularButton>           
        </UserContainer>
    );
};  

export default User;