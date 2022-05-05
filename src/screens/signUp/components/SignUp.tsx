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

const SignUpContainer = styled(Container)`
    background-color: ${Colors.Background};
    width: 100%;
    flex: 1;
`;


type props = StackScreenProps<RootStackParamList, "Welcome">;

const SignUp: React.FC<props> = ({navigation})  => {
    return (
        <SignUpContainer>         
            <KeyboardAvoidingConatainer>
                <RegularText textStyles={{marginBottom: 25}}>Identificação</RegularText>
                <Formik initialValues={{email: '', password:''}}>
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
                        </>
                    )}
                </Formik>
                <RegularButton 
                    textStyles={{color:Colors.White}} 
                    btnStyles={{width:"80%", marginBottom:50, alignSelf: 'center'}} 
                    onPress={()=>{navigation.navigate("Welcome")}}>Acessar</RegularButton> 
            </KeyboardAvoidingConatainer>
        </SignUpContainer>
    );
};  

export default SignUp;