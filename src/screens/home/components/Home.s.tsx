import styled from 'styled-components/native';

import { Container } from '../../../components/Shared';
import { Colors } from '../../../components/Colors';

export const HeaderStyled = styled.View`
    width: 100%;
    height: 100px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 50px;
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

