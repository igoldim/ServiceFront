import React from 'react';
import { Colors } from '../../../components/Colors';
import KeyboardAvoidingConatainer from '../../../components/KeyboardAvoidingConatainer';
import RegularText from '../../../components/Texts/RegularText';
import RegularButton from '../../../components/Buttons/RegularButton';
import { ActivityIndicator, StatusBar } from 'react-native';
import IconHeader from '../../../components/Icons/IconHeader';
import CodeInput from '../../../components/Input/CodeInput';
import ResendTimer from '../../../components/Timers/ResendTimer';
import MessageModal from '../../../components/Modals/MessageModal';
import { EmailVerificationProps } from './EmailVerification.t';
import { EmailVerificationContainer } from './EmailVerification.s';
import SmallText from '../../../components/Texts/SmallText';
import { useAppData } from '../../../services';
import { fetchConfirmEmail } from '../service';
import AsyncStorage from '@react-native-community/async-storage';

const EmailVerification: React.FC<EmailVerificationProps> = ({navigation})  => {

    const MAX_CODE_LENGTH = 4;
    const [code, setCode] = React.useState('');
    const [pinRead, setPinRead] = React.useState(false);
    const [isVerify, setIsVerify] = React.useState(false);
    const [resendingEmail, setResendingEmail] = React.useState(false);
    const [activeResend, setActiveResend] = React.useState(false);
    const [resendStatus, setResendStatus] = React.useState("Reenviar");
    const [visible, setVisible] = React.useState(false);
    const [messageModal, setMessageModal] = React.useState(''); //Email Validado com sucesso!
    const [messageType, setMessageType] = React.useState('');
    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [modalButtonText, setmodalButtonText] = React.useState('');     


    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    const [email, setEmail] = React.useState("");
    const [type, setUserType] = React.useState(0);

    React.useEffect(() =>{
    
        const loadData = async () => {
            const {primaryColor:strPrimaryColor, secondColor: strSecondColor, Email} = await useAppData();

            setPrimaryColor(strPrimaryColor); 
            setSecondColor(strSecondColor); 
            setEmail(Email);
        };

        loadData();

    },[]);

    const resendEmail = async (triggerTimer : any) => {
        try {
            setResendingEmail(true);

            //chamar metodo de reenvio do ActiveCode

            

            setResendStatus('Failed!'); // 'Failed!' or 'Sent!'


            setResendingEmail(false);
            //hold on briefly
            setTimeout(() =>{
                setResendStatus('Reenviar');
                setActiveResend(false);
                triggerTimer();
            }, 5000);
        } catch (error) {
            setResendStatus('Failed!');
            setResendingEmail(false);   
        }
    };

    const handleEmailVerification = async () =>{
        try {
            setIsVerify(true);
            //call backend
            var { sucessful, data, message, token} = await fetchConfirmEmail({email: email ? email : "sem@email.com", token: code!.toString()});

            if (sucessful){
                await AsyncStorage.setItem("userId", data!.id);
                await AsyncStorage.setItem("Name", data!.name);
                await AsyncStorage.setItem("Avatar", data!.avatar ? data!.avatar : "https://imagens.circuit.inf.br/noAvatar.png");
                await AsyncStorage.setItem("token", token!.toString());

                await AsyncStorage.setItem("isLogged", data?.userType == 0 ? "true" : "false");

                await AsyncStorage.setItem("userType", data!.userType?.toString() as string);
                await AsyncStorage.setItem("Email", email);
                setUserType(data?.userType as number);
                setIsVerify(false);
                return showModal('success', 'Seu email foi verificado com sucesso.', 'Muito bom!', 'Processado');
            }
            else{
                setIsVerify(false);
                return showModal('failed', 'Verifique o token digitado!', message, 'Fechar');
            }            
            //move to next page
        } catch (error) {
            setIsVerify(false);
            return showModal('failed', 'Failed!', 'Erro ao Verificar email', 'Fechar');
        } 
    }

    const modalButtonHandle = () =>{
        if (messageType === "success"){
            console.log(type);
            //verifica o tipo de usuário e redireciona a página
            if (type == 0){ //taker
                navigation.navigate('TakerDashboard');
                setVisible(false);
            }
            else{
                navigation.navigate('Documentos');
                setVisible(false);
            }
        }
        else {
            setVisible(false);
        }
    }

    const showModal = (type: string, message: string, headText: string, buttonLabel: string)=> {
        setMessageType(type);
        setMessageModal(message);
        setMessageHeadding(headText);
        setmodalButtonText(buttonLabel);
        setVisible(true);
    }

    return (
        <EmailVerificationContainer style={{backgroundColor: primaryColor}}> 
            <StatusBar barStyle="light-content" backgroundColor={primaryColor} />        
            <KeyboardAvoidingConatainer>
                <IconHeader iconeName='lock-open' color={primaryColor} iconStyles={{backgroundColor: secondColor}}/>
                <RegularText textStyles={{marginBottom: 5, textAlign: 'center', color: secondColor, fontSize: 24, fontWeight: '500'}}>Estamos verificando seu email.</RegularText>
                <SmallText textStyles={{marginBottom: 25, textAlign: 'center', color: secondColor, fontSize: 18, fontWeight: '500'}}>Digite o código recebido em seu email.</SmallText>
                
                <CodeInput primaryColor={primaryColor} secondColor={secondColor} code={code} setCode={setCode} maxLength={MAX_CODE_LENGTH} setPinRead={setPinRead}/>
                
                {!isVerify &&  pinRead && <RegularButton            
                    btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center'}}
                    textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                    onPress={handleEmailVerification}>
                    Verificar
                </RegularButton>}

 

                {!isVerify &&  !pinRead && <RegularButton            
                     btnStyles={{borderColor: secondColor, borderTopWidth: 1,  borderLeftWidth: 1,  borderRightWidth: 1,  borderBottomWidth: 1 ,backgroundColor: primaryColor, marginBottom:10, paddingTop: 10}}
                    textStyles={{color: secondColor, fontSize: 24, fontWeight: '500'}}
                    disabled={true}>
                    Verificar
                </RegularButton>}

                {isVerify && <RegularButton 
                    textStyles={{color: primaryColor}} 
                    btnStyles={{width:"80%", marginBottom:5, alignSelf: 'center', backgroundColor: Colors.Gray}}
                    disabled={true}>
                    <ActivityIndicator size={30} color={Colors.White} />
                </RegularButton>}
                <ResendTimer textColor= {secondColor} activeResend={activeResend} setActiveResend={setActiveResend} resendStatus={resendStatus} resendingEmail={resendingEmail} resendEmail={resendEmail} />    
            <MessageModal 
                visible={visible} 
                heading={messageHeadding} 
                message={messageModal} 
                btnTitle={modalButtonText} 
                type={messageType}
                onPress={modalButtonHandle}
                primaryColor={primaryColor}
                secondColor={secondColor}                
                />
            </KeyboardAvoidingConatainer>
        </EmailVerificationContainer>
    );
};  

export default EmailVerification;