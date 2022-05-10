import styled from 'styled-components/native';

import { Container } from '../../../components/Shared';
import { Colors } from '../../../components/Colors';

export const HeaderStyled = styled.View`
    width: 100%;
    height: 100px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 40px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: ${Colors.Background};
    justify-content: space-between;
`;


export const HomeContainer = styled(Container)`
    background-color: ${Colors.Background};
    flex: 1;
    width: 100%;
`;

export const TopSection = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-left: 25px;
    padding-right: 10px;
`;

export const StyledPressable = styled.Pressable`

`;