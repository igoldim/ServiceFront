import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { Colors } from './Colors';
export const ScreenWidth = Dimensions.get("screen").width;
export const ScreenHeight = Dimensions.get("screen").height;

export const Container = styled.View`
    flex: 1;
    align-items: center;
    background-color: ${Colors.Background};
    padding-top: 50px;
    width: 100%;
`;

export const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;