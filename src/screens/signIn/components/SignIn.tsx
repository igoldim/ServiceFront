import React from 'react';
import { Colors } from '../../../components/Colors';
import RegularInput from '../../../components/Input/RegularInput';
import KeyboardAvoidingConatainer from '../../../components/KeyboardAvoidingConatainer';
import { Formik } from 'formik';
import RegularText from '../../../components/Texts/RegularText';
import RegularButton from '../../../components/Buttons/RegularButton';
import Messagebox from '../../../components/Messagebox';
import { ActivityIndicator } from 'react-native';
import PressableText from '../../../components/Texts/PressableText';
import RowContainer from '../../../components/RowContainer';
import { SignInProps, IUserLogin } from './SignIn.t';
import { SignInContainer } from './SignIn.s';
import { fetchLogin, fetchResetPassword } from '../services';
import AsyncStorage from '@react-native-community/async-storage';

const SignIn: React.FC<SignInProps> = ({navigation})  => {
    const [message, setMessage] = React.useState('');
    const [emailRecovery, setEmailRecovery] = React.useState('');
    
    const [isMessageSucess, setIsMessageSucess] = React.useState(false);
   
    const handleLogin = async (credentials: IUserLogin, setSubmitting) =>{
        try {
            setMessage('');
            //call backend
            var { sucessful, data, message, token } = await fetchLogin(credentials);

            if (sucessful){
                await AsyncStorage.setItem("Name", data!.name);
                await AsyncStorage.setItem("token", token!.toString());
                await AsyncStorage.setItem("isLogged", "true");
                await AsyncStorage.setItem("userType", data!.userType);
                
                if (data!.userType == "T"){
                    navigation.navigate('HomeTomador');
                }
                else if (data!.userType == "P"){
                    navigation.navigate('HomePrestador');
                } 
                else{
                    await AsyncStorage.removeItem("Name");
                    await AsyncStorage.setItem("isLogged", "false");
                    navigation.navigate('Welcome');
                }
            }
            else{
                await AsyncStorage.setItem("isLogged", "false");
                setMessage(message);
            }

            setSubmitting(false);
        } catch (error) {
            setMessage("Login falhou!");
            setSubmitting(false);
        } 
    }


    const handleResetPassword = async () => {
        try {
            setMessage('');
            //call backend
            if (emailRecovery === ''){
                setMessage('preencha seu email!');
                return false;
            }

            var { sucessful, message } = await fetchResetPassword(emailRecovery);

            if (sucessful){
                setMessage('Senha recuperada com sucesso, verifique seu email.');
                return true;
            }
            else{
                setMessage(message);
                return false;
            }
        } catch (error) {
            setMessage("Recuperação falhou!");
        } 
    }



    return (
        <SignInContainer>         
            <KeyboardAvoidingConatainer>
                <RegularText textStyles={{marginBottom: 25}}>Identificação</RegularText>
                <Formik 
                        initialValues={{
                            email: '', 
                            password:''
                        }} 
                        onSubmit={(values, {setSubmitting})=>{
                            values.email = emailRecovery;
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
                                onChangeText={setEmailRecovery}
                                onBlur={handleBlur('email')}
                                value={emailRecovery}
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
                            <RowContainer >
                                <PressableText onPress={()=> navigation.navigate('Comecar')}>Novo Cadastro</PressableText>
                                <PressableText onPress={handleResetPassword}>Recuperear Senha</PressableText>
                            </RowContainer>
                        </>
                    )}
                </Formik>
            </KeyboardAvoidingConatainer>
        </SignInContainer>
    );
};  

export default SignIn;