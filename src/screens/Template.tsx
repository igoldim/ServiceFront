import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../../../components/Colors';
import { Container } from '../../../../components/Shared';
import { RootStackParamList } from '../../../components/Navigators/RootStack';
import { StackScreenProps } from '@react-navigation/stack';

const TemplateContainer = styled(Container)`
    background-color: ${Colors.Background};
    width: 100%;
    flex: 1;
`;


type props = StackScreenProps<RootStackParamList, "Welcome">;

const Template: React.FC<props> = ({navigation})  => {
    return (
        <TemplateContainer>           
        </TemplateContainer>
    );
};  

export default Template;