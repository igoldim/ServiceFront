import styled from 'styled-components/native';
import { Colors } from '../Colors';
import { ScreenWidth } from '../Shared';

export const CardBackground = styled.ImageBackground`
    height: 75%;
    width: ${ScreenWidth * 0.67}px;
    resize-mode: cover;
    background-color: ${Colors.Salmon};
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
    background-color: ${Colors.Aqua};
    width: 50px;
    height: 50px;
    border-radius: 50px;
    flex: 1;
    resize-mode: cover;
`;