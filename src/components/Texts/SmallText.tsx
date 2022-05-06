import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../Colors';
import { TextProps } from './types.d';

const StyledText = styled.Text`
    font-size: 18px;
    color: ${Colors.Gray};
    text-align: left;
`;

const SmallText: React.FC<TextProps> = (props) => {
    return <StyledText style={props.textStyles}>{props.children}</StyledText>;
};  

export const SpanBold = styled(SmallText)``;

export default SmallText;