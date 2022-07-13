import styled from "styled-components/native";

export const FavoritesRow = styled.View`
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 5px;
    padding: 10px ;
`;

export const FavoritesHead = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
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
    width: 100%;
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
