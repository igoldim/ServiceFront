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

const SignUpContainer = styled(Container)`
    background-color: ${Colors.Background};
    width: 100%;
    flex: 1;
`;

type props = StackScreenProps<RootStackParamList, "Welcome">;

type InitialValues = {
    fullName: '',
    email: '', 
    password:'',
    rePassword:'',
}

const SignUp: React.FC<props> = ({navigation})  => {
    const [message, setMessage] = React.useState('');
    const [isMessageSucess, setIsMessageSucess] = React.useState(false);
    
    const handleSignUp = async (credentials: InitialValues, setSubmitting) =>{
        try {
            setMessage('');            
            //call backend
            if (credentials.email == "igoldim@gmail.com" && credentials.password == "002274"){

            }
            else{
                setMessage('Credênciais inválidas');
            }
            //move to next page


            setSubmitting(false);
        } catch (error) {
            setMessage('Cadastro falhou!');
            setSubmitting(false);
        } 
    }
    return (
        <SignUpContainer>         
            <KeyboardAvoidingConatainer>
                <RegularText textStyles={{marginBottom: 25}}>Novo Cadastro</RegularText>
                <Formik 
                        initialValues={{
                            fullName: '',
                            email: '', 
                            password:'',
                            rePassword:'',
                        }} 
                        onSubmit={(values, {setSubmitting})=>{
                            if (values.fullName == "" || values.email == "" || values.password == "" || values.rePassword == "") {
                                setMessage('Por favor, verifique os dados digitados.');
                                setSubmitting(false);
                            }
                            else if (values.password !== values.rePassword){
                                setMessage('Passeords não conferem.');
                                setSubmitting(false);
                            }
                            else{
                                handleSignUp(values, setSubmitting);
                            }
                        }}>
                    {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                        <>
                            <RegularInput 
                                title='Nome completo' 
                                iconeName="account"  
                                placeholder='Nome completo'
                                onChangeText={handleChange('fullName')}
                                onBlur={handleBlur('fullName')}
                                value={values.fullName}
                            />
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
                            <RegularInput 
                                title='Confirm Password' 
                                iconeName="form-textbox-password"  
                                placeholder="* * * * * *"
                                onChangeText={handleChange('rePassword')}
                                onBlur={handleBlur('rePassword')}
                                value={values.rePassword}
                                isPassword={true}
                            />
                            <Messagebox textStyle={{ marginBottom: 25}} success={isMessageSucess}>{ message || " " }</Messagebox>
                            {!isSubmitting &&  <RegularButton 
                                textStyles={{color:Colors.White}} 
                                btnStyles={{width:"80%", marginBottom:10, alignSelf: 'center'}} 
                                onPress={handleSubmit}>Gravar</RegularButton>}
                             
                             {isSubmitting &&  <RegularButton 
                                textStyles={{color:Colors.White}} 
                                btnStyles={{width:"80%", marginBottom:10, alignSelf: 'center'}}>
                                <ActivityIndicator size={30} color={Colors.White} /></RegularButton>}
                        </>
                    )}
                </Formik>
            </KeyboardAvoidingConatainer>
        </SignUpContainer>
    );
};  
export default SignUp;