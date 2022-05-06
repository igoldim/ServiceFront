import styled from 'styled-components/native';
import { Colors } from '../../../components/Colors';
import { Container } from '../../../components/Shared';

export const SignInContainer = styled(Container)`
    background-color: ${Colors.Background};
    width: 100%;
    flex: 1;
`;

export type InitialValues = {
    email: '', 
    password:''
}