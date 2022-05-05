import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../../../../components/Colors';
import { Container } from '../../../../components/Shared';
import { RootStackParamList } from '../../../../components/Navigators/RootStack';
import { StackScreenProps } from '@react-navigation/stack';

import BigText from '../../../../components/Texts/BigText';
import SmallText from '../../../../components/Texts/SmallText';
import RegularButton from '../../../../components/Buttons/RegularButton';
import RegularInput from '../../../../components/Input/RegularInput';
import { ScrollView } from 'react-native-gesture-handler';

const CadastroContainer = styled(Container)`
    background-color: ${Colors.Background};
    width: 100%;
    flex: 1;
`;


type props = StackScreenProps<RootStackParamList, "Welcome">;

const Cadastro: React.FC<props> = ({navigation})  => {
    return (
        <CadastroContainer>      
            <BigText textStyles={{textAlign:'center', marginTop:55, marginBottom:25}}>Cadastro Profissional</BigText>   
            <ScrollView style={{width: '100%'}}>
                <RegularInput title='CPF' textStyles={{paddingLeft:40, textAlign:'left'}} inputStyles={{marginBottom:10}} onChange={()=>{}} placeholder="CPF" keyboardType="number-pad" maxLength={14}/>
                <RegularInput title='Nome' textStyles={{paddingLeft:40, textAlign:'left'}} inputStyles={{marginBottom:10}} onChange={()=>{}} placeholder="Nome"  autoCapitalize={'characters'}/>
                <RegularInput title='Telefone' textStyles={{paddingLeft:40, textAlign:'left'}} inputStyles={{marginBottom:10}} onChange={()=>{}} placeholder="Telefone" maxLength={11} keyboardType="phone-pad"/>
                <RegularInput title='E-mail' textStyles={{paddingLeft:40, textAlign:'left'}} inputStyles={{marginBottom:10}} onChange={()=>{}} placeholder="E-mail"  autoCapitalize={'characters'}/>
                <RegularInput title='Cep' textStyles={{paddingLeft:40, textAlign:'left'}} inputStyles={{marginBottom:10}} onChange={()=>{}} placeholder="Cep" keyboardType="number-pad" maxLength={8}/>
                <RegularInput title='Endereço' textStyles={{paddingLeft:40, textAlign:'left'}} inputStyles={{marginBottom:10}} onChange={()=>{}} placeholder="Endereço" autoCapitalize={'characters'}/>
                <RegularInput title='Número' textStyles={{paddingLeft:40, textAlign:'left'}} inputStyles={{marginBottom:10}} onChange={()=>{}} placeholder="Número" autoCapitalize={'characters'}/>
                <RegularInput title='Complemento' textStyles={{paddingLeft:40, textAlign:'left'}} inputStyles={{marginBottom:10}} onChange={()=>{}} placeholder="Complemento" autoCapitalize={'characters'}/>
                <RegularInput title='Bairro' textStyles={{paddingLeft:40, textAlign:'left'}} inputStyles={{marginBottom:10}} onChange={()=>{}} placeholder="Bairro" autoCapitalize={'characters'}/>
            </ScrollView>
        </CadastroContainer>
    );
};  

export default Cadastro;
