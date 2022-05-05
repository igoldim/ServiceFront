import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../../../components/Colors';
import { Container } from '../../../components/Shared';

import BigText from '../../../components/Texts/BigText';
import SmallText from '../../../components/Texts/SmallText';
import RegularButton from '../../../components/Buttons/RegularButton';


const ComecarContainer = styled(Container)`
    background-color: ${Colors.Background};
    width: 100%;
    flex: 1;
`;


import { RootStackParamList } from '../../../components/Navigators/RootStack';
import { StackScreenProps } from '@react-navigation/stack';

type props = StackScreenProps<RootStackParamList, "Welcome">;

const Comecar: React.FC<props> = ({navigation})  => {
    return (
        <ComecarContainer>          
            <BigText textStyles={{marginTop:55, marginBottom:25}}>Vamos começar!</BigText>
            <SmallText textStyles={{marginTop:10, marginBottom:25}}>Escolha um perfil</SmallText>
            <RegularButton 
                textStyles={{color:Colors.Background}} 
                btnStyles={{width:"75%", marginBottom:50}} 
                onPress={()=>{navigation.navigate("User")}}>Sou tomador de serviço</RegularButton>            
            <RegularButton 
                textStyles={{color:Colors.Background}} 
                btnStyles={{width:"75%", marginBottom:50}} 
                onPress={()=>{navigation.navigate("Profissional")}}>Sou prestador de serviço</RegularButton>

            <BigText textStyles={{width:"70%", marginBottom:25}}>Tomador</BigText>
            <SmallText textStyles={{width:"70%", marginBottom:25}}>O tomador de serviço é quem contrata o prestado de serviço, usuários em geral.</SmallText>                
            
            <BigText textStyles={{width:"70%", marginBottom:25}}>Prestador</BigText>
            <SmallText textStyles={{width:"70%", marginBottom:25}}>O prestador de serviço é quem realiza o serviço ao tomador, diáristas.</SmallText>                
        </ComecarContainer>
    );
};  
export default Comecar;