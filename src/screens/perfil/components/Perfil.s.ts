import styled from "styled-components/native";
import { ScreenHeight } from "../../../components/Shared";

export const Container = styled.View`
  height: 100%; 
  padding:20px;
`;

export const IconImg = styled.TouchableOpacity`
    display: flex;
    width: 150px;
    height: 150px;
    border-radius: ${ScreenHeight * 0.2}px;
    justify-content: center;
    align-items: center;
    align-self: center;
`;