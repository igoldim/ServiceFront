import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../Colors';

const StyledText = styled.Text`
    font-size: 18px;
    color: ${Colors.Gray};
    text-align: left;
`;

import { TextProps } from './types.d';

const SmallText: React.FC<TextProps> = (props) => {
    return <StyledText style={props.textStyles}>{props.children}</StyledText>;
};  

export default SmallText;