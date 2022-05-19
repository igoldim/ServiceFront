import React from 'react';
import { Colors } from '../../../components/Colors';
import RegularInput from '../../../components/Input/RegularInput';
import KeyboardAvoidingConatainer from '../../../components/KeyboardAvoidingConatainer';
import { Formik } from 'formik';
import RegularText from '../../../components/Texts/RegularText';
import RegularButton from '../../../components/Buttons/RegularButton';
import Messagebox from '../../../components/Messagebox';
import { ActivityIndicator } from 'react-native';

import { SignUpContainer } from './SignUp.s';
import { fetchRegister } from '../services';
import AsyncStorage from '@react-native-community/async-storage';
import { IUserRegister } from '../../signIn/components/SignIn.t';

const SignUp: React.FC<SignUpProps> = ({navigation})  => {
    const [message, setMessage] = React.useState('');
    const [isMessageSucess, setIsMessageSucess] = React.useState(false);
    
    const handleSignUp = async (credentials: IUserRegister, setSubmitting) =>{
        try {
            setMessage('');            
            //call backend
            const userType = await AsyncStorage.getItem("userTypeReg");

            credentials.userType = userType ? userType : "T";
            var { sucessful, data, message} = await fetchRegister(credentials);

            if (sucessful){
                await AsyncStorage.setItem("email", data!.email);

                navigation.navigate('EmailVerification');
            }
            else{
                setMessage(message);
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
                            name: '',
                            email: '', 
                            password:'',
                            rePassword:'',
                        }} 
                        onSubmit={(values, {setSubmitting})=>{
                            if (values.name == "" || values.email == "" || values.password == "" || values.rePassword == "") {
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
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
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