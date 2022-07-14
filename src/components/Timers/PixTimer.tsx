import React from 'react';
import styled from 'styled-components/native';
import SmallText from '../Texts/SmallText';
import PressableText from '../Texts/PressableText';
import RowContainer from '../RowContainer';
import { PixTimerProps } from '../../types/AppType';

const StayledView = styled.View`
    align-items: center;
`;

const PixTimer: React.FC<PixTimerProps> = ({targetTimeInSeconds = 59, textColor, ...props})  => {
    const [timeLeft, setTimeLeft] = React.useState(targetTimeInSeconds);
    const [targetTime, setTargetTime] = React.useState(targetTimeInSeconds);

    let resendTimeInterval: any;

    const triggerTimer = (targetTimeInSeconds: number = 59) =>{
        setTargetTime(targetTimeInSeconds);
        const finalTime = +new Date() + targetTimeInSeconds * 1000;
        resendTimeInterval = setInterval(()=> calculateTimeLeft(finalTime), 1000);
    }

    const calculateTimeLeft = (finalTime: any) =>{
        const difference = finalTime - +new Date(); 
        if (difference >= 0){
            setTimeLeft(Math.round(difference/1000));
        }else{
            clearInterval(resendTimeInterval);
            setTimeLeft(0);
        }
    }

    React.useEffect(()=>{
        setTimeout(() =>{
            triggerTimer(targetTimeInSeconds);
        }, 5000);
        return () => {
            clearInterval(resendTimeInterval);
        }
    },[]);

    return (<StayledView {...props}>
                <RowContainer>
                    <SmallText textStyles={{color: textColor}}>Processando Pagamento</SmallText>
                </RowContainer>
                <SmallText textStyles={{color: textColor, fontWeight:'bold'}}>em {timeLeft || targetTime} segundo(s)</SmallText> 
            </StayledView>
    );
};  

export default PixTimer;