import styled from "styled-components/native";
import { ScreenHeight } from "../Shared";


export const FavoritesSectionBackground = styled.View`
    width: 100%;
    padding-top: 5px;
    flex: 2;
`;

export const FavoritesRow = styled.View`
    width: ${ScreenHeight * 0.385}px;
    height: 130px;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 5px;
`;

export const FavoritesHead = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    width: ${ScreenHeight * 0.38}px;
`;

export const Favoritestatus = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 85px;
    height: 25px;
    border-radius: 4px;
`;


export const  FavoritesDate = styled.View`
    padding-left: 10px;
    width: 100%;
    border-radius: 4px;
`;

export const  FavoritesFooter = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    width: ${ScreenHeight * 0.38}px;
`;


export const  FavoritesValor = styled.View`
    display: flex;
`;


export const  FavoritesFooterItem = styled.View`

`;


export const  FavoritesButton = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 4px;
`;


export const FavoritesList = styled.FlatList`
    width: 100%;
`;
