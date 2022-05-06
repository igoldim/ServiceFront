import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../Colors';

import { ScreenHeight } from '../Shared';
import { StyleProp, ViewStyle } from 'react-native';

const IconBg = styled.View`
    background-color: ${Colors.Gray};
    width: ${ScreenHeight * 0.15}px;
    height: ${ScreenHeight * 0.15}px;
    border-radius: ${ScreenHeight * 0.2}px;
    justify-content: center;
    align-items: center;
    align-self: center;
    margin-bottom: 25px;
`;

interface IconProps{
    iconeName: string,
    iconStyles?: StyleProp<ViewStyle>;
    color?: string | undefined;
}

const IconHeader: React.FC<IconProps> = (props)  => {
    return (
        <IconBg style={props?.iconStyles}><Icon name={props.iconeName} size={ScreenHeight * 0.08} color={props.color}/></IconBg>
    );
};  

export default IconHeader;