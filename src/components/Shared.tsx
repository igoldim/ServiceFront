import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
export const ScreenWidth = Dimensions.get("screen").width;
export const ScreenHeight = Dimensions.get("screen").height;

export const Container = styled.View`
    height: 100%; 
    padding: 20px;
`;

export const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;


export const StyledScrollView = styled.ScrollView`
  height: 100%; 
  margin-top: 10px;
`;