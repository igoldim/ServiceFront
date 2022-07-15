import styled from 'styled-components/native';
import { ScreenWidth } from '../Shared';

export const CardBackground = styled.View`
    width: ${ScreenWidth * 0.80}px;
    border-radius: 10px;
    margin-right: 25px;
    overflow: hidden;
`;

export const CardBackgroundF = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 130px;
    width: ${ScreenWidth * 0.60}px;
    border-radius: 15px;
    overflow: hidden;
    align-self: center ;
    padding: 10px;
    margin-bottom: 20px;
`;

export const CardTouchable = styled.TouchableHighlight`
    height: 100%;
    border-radius: 25px;
`;

export const CardTouchableF = styled.View`
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
`;