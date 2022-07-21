import styled from 'styled-components/native';
import { Colors } from '../../../components/Colors';

export const ModalPressableContainer = styled.Pressable`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ModalView = styled.ScrollView`
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    height: 100%;
    /*elavation: 5;
    shadow-color: ${Colors.Black};
    shadown-offset: 0px 2px;
    shadownOpacity: 0.25;
    shadown-radius: 4px;*/
`;

export const ModalHead = styled.View`
    flex-direction: row;
    justify-content: space-between;
    background-color: ${Colors.Background};
    width: 100%;
    height: 60px;
    padding: 10px;
    align-items: center;
`;

export const StyledImage = styled.Image`
    resize-mode: cover;
    width: 100%;
    height: 100%;
    border-radius: 10px;    
`;
