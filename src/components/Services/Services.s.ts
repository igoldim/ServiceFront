import styled from "styled-components/native";
import { ScreenHeight } from "../Shared";


export const ServicesSectionBackground = styled.View`
    width: 100%;
    padding-top: 5px;
    flex: 2;
`;

export const ServicesRow = styled.View`
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 5px;
`;

export const ServiceHead = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
`;

export const ServiceStatus = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 85px;
    height: 25px;
    border-radius: 4px;
`;


export const ServiceDate = styled.View`
    padding-left: 10px;
    width: 100%;
    border-radius: 4px;
`;

export const ServiceFooter = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
`;


export const ServiceValor = styled.View`
    display: flex;
`;


export const ServiceFooterItem = styled.View`

`;


export const ServiceButton = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 4px;
`;


export const ServicesList = styled.FlatList`
    width: 100%;
`;
