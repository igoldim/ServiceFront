import React from 'react';
import { Colors } from '../../../components/Colors';
import BigText from '../../../components/Texts/BigText';
import SmallText from '../../../components/Texts/SmallText';
import RegularButton from '../../../components/Buttons/RegularButton';
import { ComecarProps } from './Comecar.t';
import { ComecarContainer } from './Comecar.s';

const Comecar: React.FC<ComecarProps> = ({navigation})  => {
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