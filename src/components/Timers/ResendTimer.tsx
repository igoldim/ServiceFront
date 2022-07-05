import React from 'react';
import styled from 'styled-components/native';
import SmallText from '../Texts/SmallText';
import PressableText from '../Texts/PressableText';
import { Colors } from '../Colors';
import RowContainer from '../RowContainer';
import { ResendTimerProps } from '../../types/AppType';

const StayledView = styled.View`
    align-items: center;
`;

const ResendTimer: React.FC<ResendTimerProps> = ({activeResend, setActiveResend, targetTimeInSeconds = 30, resendEmail, resendingEmail, resendStatus, textColor, ...props})  => {
    const [timeLeft, setTimeLeft] = React.useState(targetTimeInSeconds);
    const [targetTime, setTargetTime] = React.useState(targetTimeInSeconds);

    let resendTimeInterval: any;

    const triggerTimer = (targetTimeInSeconds: number = 30) =>{
        setTargetTime(targetTimeInSeconds);
        setActiveResend(false);
        const finalTime = +new Date() + targetTimeInSeconds * 1000;
        resendTimeInterval = setInterval(()=> calculateTimeLeft(finalTime), 1000);
    }

    const calculateTimeLeft = (finalTime: any) =>{
        const difference = finalTime - +new Date(); 
        if (difference >= 0){
            setTimeLeft(Math.round(difference/1000));
        }else{
            clearInterval(resendTimeInterval);
            setActiveResend(true);
            setTimeLeft(0);
        }
    }

    React.useEffect(()=>{
        triggerTimer(targetTimeInSeconds);
        return () => {
            clearInterval(resendTimeInterval);
        }
    },[]);

    return (<StayledView {...props}>
                <RowContainer>
                    <SmallText textStyles={{color: textColor}}>Não recebeu o email? </SmallText>
                    <PressableText textStyles={{color: textColor, fontWeight: '800'}} onPress={() => resendEmail(triggerTimer)} disabled={!activeResend} btnStyles={{opacity: !activeResend ? 0.65 : 1}} >
                            {resendStatus}
                    </PressableText> 
                </RowContainer>
                    {!activeResend && (
                        <SmallText textStyles={{color: textColor, fontWeight:'bold'}}>em {timeLeft || targetTime} segundo(s)</SmallText> 
                    )}                    
                </StayledView>
    );
};  

export default ResendTimer;