import React from 'react';
import { StyledView } from './Greeting.s';
import { GreetingProps } from './Greeting.t';
import RegularText from '../Texts/RegularText';
import SmallText from '../Texts/SmallText';
import { Colors } from '../Colors';

const Greeting: React.FC<GreetingProps> = ( props ) => {
    return (
        <StyledView>         
            <RegularText textStyles={[{color: Colors.Gray, fontSize: 22}, props.mainTextStyle]}>
                {props.mainText}
            </RegularText>  
            <SmallText textStyles={[{color: Colors.DarkGray, fontSize: 12}, props.subTextStyle]}>
                {props.subtext}
            </SmallText>
        </StyledView>
    );
};  

export default Greeting;