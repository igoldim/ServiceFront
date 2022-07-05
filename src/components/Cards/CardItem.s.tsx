import styled from 'styled-components/native';
import { ScreenWidth } from '../Shared';

export const CardBackground = styled.View`
    height: 100%;
    width: ${ScreenWidth * 0.60}px;
    border-radius: 15px;
    margin-right: 25px;
    overflow: hidden;
`;

export const CardTouchable = styled.TouchableHighlight`
    height: 100%;
    border-radius: 25px;
`;

export const TouchableView = styled.View`
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    flex: 1;    
`;


export const CardRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const Avatar = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 100px;
    flex: 1;
`;