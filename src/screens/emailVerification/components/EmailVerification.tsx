import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../../../components/Colors';
import { Container } from '../../../components/Shared';
import { RootStackParamList } from '../../../components/Navigators/RootStack';
import { StackScreenProps } from '@react-navigation/stack';

import RegularInput from '../../../components/Input/RegularInput';
import KeyboardAvoidingConatainer from '../../../components/KeyboardAvoidingConatainer';

import { Formik } from 'formik';

import RegularText from '../../../components/Texts/RegularText';
import RegularButton from '../../../components/Buttons/RegularButton';

import Messagebox from '../../../components/Messagebox';
import { ActivityIndicator } from 'react-native';

import PressableText from '../../../components/Texts/PressableText';

import RowContainer from '../../../components/RowContainer';

const EmailVerificationContainer = styled(Container)`
    background-color: ${Colors.Background};
    width: 100%;
    flex: 1;
`;

type props = StackScreenProps<RootStackParamList, "Welcome">;

type InitialValues = {
    email: '', 
    password:''
}

const EmailVerification: React.FC<props> = ({navigation})  => {
    const [message, setMessage] = React.useState('');
    const [isMessageSucess, setIsMessageSucess] = React.useState(false);
    
    const handleLogin = async (credentials, setSubmitting) =>{
        try {
            setMessage('');

            //call backend
            if (credentials.email == "igoldim@gmail.com" && credentials.password == "002274"){

            }
            else{
                setMessage('Credenciais inválidas');
            }
            //move to next page


            setSubmitting(false);
        } catch (error) {
            setMessage('Login falhou!');
            setSubmitting(false);
        } 
    }
    return (
        <EmailVerificationContainer>         
            <KeyboardAvoidingConatainer>
                <RegularText textStyles={{marginBottom: 25}}>Identificação</RegularText>
                <Formik 
                        initialValues={{
                            email: '', 
                            password:''
                        }} 
                        onSubmit={(values, {setSubmitting})=>{
                            if (values.email == "" && values.password == "") {
                                setMessage('Por favor, verifique os dados digitados.');
                                setSubmitting(false);
                            }
                            else{
                                handleLogin(values, setSubmitting);
                            }
                        }}>
                    {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                        <>
                            <RegularInput 
                                title='E-mail Address' 
                                iconeName="email-variant"  
                                placeholder='email@teste.com'
                                keyboardType='email-address'
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            <RegularInput 
                                title='Password' 
                                iconeName="form-textbox-password"  
                                placeholder="* * * * * *"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                isPassword={true}
                            />
                            <Messagebox textStyle={{ marginBottom: 25}} success={isMessageSucess}>{ message || " " }</Messagebox>
                            {!isSubmitting &&  <RegularButton 
                                textStyles={{color:Colors.White}} 
                                btnStyles={{width:"80%", marginBottom:10, alignSelf: 'center'}} 
                                onPress={handleSubmit}>Acessar</RegularButton>}
                             
                             {isSubmitting &&  <RegularButton 
                                textStyles={{color:Colors.White}} 
                                btnStyles={{width:"80%", marginBottom:10, alignSelf: 'center'}}>
                                <ActivityIndicator size={30} color={Colors.White} /></RegularButton>}
                        </>
                    )}
                </Formik>
            </KeyboardAvoidingConatainer>
        </EmailVerificationContainer>
    );
};  

export default EmailVerification;