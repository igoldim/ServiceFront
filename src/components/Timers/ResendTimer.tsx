import React from 'react';
import styled from 'styled-components/native';
import SmallText from '../Texts/SmallText';
import PressableText from '../Texts/PressableText';
import { Colors } from '../Colors';
import RowContainer from '../RowContainer';

const StayledView = styled.View`
    align-items: center;
`;

const ResendText = styled(SmallText)`
    color: ${Colors.Cyan};
    ${(props) => {
     const { resendStatus } = props;
        if (resendStatus === 'Failed!' ){
            return `color: ${Colors.Red}`;
        }
        else if (resendStatus === 'Sent!' ){
            return `color: ${Colors.Blue}`;
        }
    }}
`;


const ResendTimer: React.FC = ({activeResend, setActiveResend, targetTimeInSeconds = 30, resendEmail, resendStatus, ...props})  => {
    const [timeLeft, setTimeLeft] = React.useState(targetTimeInSeconds);
    const [targetTime, setTargetTime] = React.useState(targetTimeInSeconds);

    let resendTimeInterval;

    const triggerTimer = (targetTimeInSeconds = 30) =>{
        setTargetTime(targetTimeInSeconds);
        setActiveResend(false);
        const finalTime = +new Date() + targetTimeInSeconds * 1000;
        resendTimeInterval = setInterval(()=> calculateTimeLeft(finalTime), 1000);
    }

    const calculateTimeLeft = (finalTime) =>{
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
                    <SmallText>Não recebeu o email? </SmallText>
                    <PressableText onPress={() => resendEmail(triggerTimer)} disabled={!activeResend} btnStyles={{opacity: !activeResend ? 0.65 : 1}} ><ResendText resendStatus={resendStatus}>{resendStatus}</ResendText></PressableText> 
                </RowContainer>
                    {!activeResend && (
                        <SmallText textStyles={{fontWeight:'bold'}}>em {timeLeft || targetTime} segundo(s)</SmallText> 
                    )}
                    
                </StayledView>
    );
};  

export default ResendTimer;