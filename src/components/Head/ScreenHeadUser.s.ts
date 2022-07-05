import styled from "styled-components/native";
import { Colors } from "../Colors";
import { ScreenHeight } from "../Shared";

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%; 
  justify-content: space-between;
`;

export const StyledView = styled.View`
  display: flex;
  flex-direction: column;
`;


export const Line = styled.View`  
  width: 100%; 
  height: 0px; 
`;


export const IconImg = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: ${ScreenHeight * 0.2}px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;