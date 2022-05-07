import React from 'react';
import { Colors } from '../../../components/Colors';
import KeyboardAvoidingConatainer from '../../../components/KeyboardAvoidingConatainer';
import RegularText from '../../../components/Texts/RegularText';
import RegularButton from '../../../components/Buttons/RegularButton';
import { ActivityIndicator } from 'react-native';
import IconHeader from '../../../components/Icons/IconHeader';
import CodeInput from '../../../components/Input/CodeInput';
import ResendTimer from '../../../components/Timers/ResendTimer';
import MessageModal from '../../../components/Modals/MessageModal';
import { EmailVerificationProps } from './EmailVerification.t';
import { EmailVerificationContainer } from './EmailVerification.s';
import SmallText from '../../../components/Texts/SmallText';

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


    const resendEmail = async (triggerTimer : any) => {
        try {
            setResendingEmail(true);

            //make request to backend to send email

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
            if (code === "1234"){
                setIsVerify(false);
                return showModal('success', 'All Good!', 'Seu email foi verificado com sucesso.', 'Processado');
            }
            else{
                setIsVerify(false);
                return showModal('failed', 'Failed!', 'Codigo inválido', 'Fechar');
            }
            //move to next page
        } catch (error) {
            setIsVerify(false);
            return showModal('failed', 'Failed!', 'Erro ao Verificar email', 'Fechar');
        } 
    }

    const modalButtonHandle = () =>{
        if (messageType === "success"){
            //chamar pagina de complemento de cadastro
            navigation.navigate('SignIn');
        }
        setVisible(false);
    }

    const showModal = (type, message, headText, buttonLabel) => {
        setMessageType(type);
        setMessageModal(message);
        setMessageHeadding(headText);
        setmodalButtonText(buttonLabel);
        setVisible(true);
    }

    return (
        <EmailVerificationContainer>         
            <KeyboardAvoidingConatainer>
                <IconHeader iconeName='lock-open'/>
                <RegularText textStyles={{marginBottom: 5, textAlign: 'center'}}>Estamos verificando seu email.</RegularText>
                <SmallText textStyles={{marginBottom: 25, textAlign: 'center'}}>Digite o código recebido em seu email.</SmallText>
                
                <CodeInput code={code} setCode={setCode} maxLength={MAX_CODE_LENGTH} setPinRead={setPinRead}/>
                
                {!isVerify &&  pinRead && <RegularButton 
                                textStyles={{color:Colors.White}} 
                                btnStyles={{width:"80%", marginBottom:5, alignSelf: 'center'}} 
                                onPress={handleEmailVerification}>Verificar</RegularButton>}

                {!isVerify &&  !pinRead && <RegularButton 
                                textStyles={{color:Colors.LightGrey}} 
                                btnStyles={{width:"80%", marginBottom:5, alignSelf: 'center', backgroundColor: Colors.Gray}}
                                disabled={true} 
                                >Verificar</RegularButton>}

                {isVerify &&  <RegularButton 
                    textStyles={{color:Colors.White}} 
                    btnStyles={{width:"80%", marginBottom:5, alignSelf: 'center'}}>
                    <ActivityIndicator size={30} color={Colors.White} /></RegularButton>}
                <ResendTimer activeResend={activeResend} setActiveResend={setActiveResend} resendStatus={resendStatus} resendingEmail={resendingEmail} resendEmail={resendEmail} />    
            <MessageModal 
                visible={visible} 
                setVisible={setVisible} 
                heading={messageHeadding} 
                message={messageModal} 
                btnTitle={modalButtonText} 
                type={messageType}
                onPress={modalButtonHandle}
                />
            </KeyboardAvoidingConatainer>
        </EmailVerificationContainer>
    );
};  

export default EmailVerification;