import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from './Colors';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    background-color: ${Colors.Background};
`;


export const ScreenWidth = Dimensions.get("screen").width;
export const ScreenHeight = Dimensions.get("screen").height;
