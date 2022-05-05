import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../Colors';

const IconBg = styled.View`
    flex: 1;
    align-items: center;
    background-color: ${Colors.Background};
    padding-top: 50px;
    width: 100%;
`;
interface IconProps{
    iconeName: string,
}

const IconHeader: React.FC<IconProps> = (props)  => {
    return (
        <IconBg {...props}><Icon name={props.iconeName}/></IconBg>
    );
};  

export default IconHeader;