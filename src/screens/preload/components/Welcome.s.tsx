import styled from 'styled-components/native';
import { Colors } from '../../../components/Colors';
import { Container } from '../../../components/Shared';

export const WelcomeContainer = styled(Container)`
    background-color: ${Colors.Background};
    justify-content: space-between;
    width: 100%;
    height: 100%;
`;

export const TopImage = styled.Image`
    width: 95%;
    height: 100%;   
    margin:0 auto ;
    resize-mode: cover;
`;

export const TopSection = styled.View`
    width: 100%;
    flex: 1;
    max-height: 60%;
    align-items: center;
`;

export const BottonSection = styled.View`
    width: 100%;
    padding: 20px;
    flex: 1;
    justify-content: flex-end;
`;