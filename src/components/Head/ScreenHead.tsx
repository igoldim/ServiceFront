import React, { ReactNode } from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BigText from "../Texts/BigText";
import SmallText from '../Texts/SmallText';
import { Container, LeftIcon, Line, RightIcon } from "./ScreenHead.s";

type Props = {
    primaryColor: string;
    secondColor: string;
    screenName: string;
    onPress?: () => void | undefined | null;
    onRightPress?: () => void | undefined | null;
    showIcon?: boolean;
    showRightIcon?: boolean;
    showRightMenu?: boolean;
    RightIconName?: string; 
    showVersion?: boolean;
    version?: string;
    children?: ReactNode;
}


const ScreenHead: React.FC<Props> = ({screenName, primaryColor, secondColor, onPress, onRightPress, showIcon = false, showVersion = false, version, showRightIcon = false, RightIconName, showRightMenu= false, children}) => {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={primaryColor} />
            <Container style={{display: 'flex', justifyContent:'space-between'}}>
                {showIcon && <LeftIcon onPress={onPress}>
                    <Icon name="arrow-left-thick"  size={30} color={secondColor} />
                </LeftIcon>}
                <BigText textStyles={{color: secondColor, flex:1, fontSize: 24, fontWeight: '800', marginBottom:20}}>{screenName}</BigText> 
                {showVersion && 
                    <SmallText textStyles={{color: secondColor, fontWeight: '800', marginBottom:20}}>Versão {version}</SmallText> 
                }
                {showRightIcon && <RightIcon onPress={onRightPress}>                   
                     <Icon name={RightIconName as string}  size={30} color={secondColor} />
                </RightIcon>}

                {showRightMenu && <RightIcon onPress={onRightPress}>                   
                   {children}
                </RightIcon>}
            </Container>
            <Line style={{borderBottomWidth: 1.5, borderColor: `${secondColor}`, opacity: 0.2, borderStyle:'solid'}}/>
        </>
    );
};

export default ScreenHead;