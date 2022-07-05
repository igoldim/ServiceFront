import styled from "styled-components/native";
import { ScreenHeight, ScreenWidth } from "../Shared";

export const Container = styled.View`
    flex: 1;
    width: 100%;
`;


export const CardCommentList = styled.FlatList`
    width: 100%;
    padding-left: 20px;
`;

export const StyledFlatList = styled.FlatList`
    width: 100%;
    height: 40%;
`;

export const ListContainer = styled.TouchableOpacity`
    width: ${ScreenHeight * 0.385}px;
    height: 140px;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 5px;
`;

export const CommentItemContainer = styled.View`
    width: ${ScreenHeight * 0.385}px;
    height: 140px;
    border-radius: 5px;
    margin-right: 25px;
    overflow: hidden;
`;


export const ListHead = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    width: ${ScreenHeight * 0.38}px;
`;

export const ListStatus = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
`;

export const ListStatusRodape = styled.View`
    flex-direction: row;
    justify-content: center;
`;


export const  ListFooter = styled.View`
    padding-left: 10px;
    padding-right: 10px;
`;


export const  ListFooterItem = styled.View`
`;

export const ListRow = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
`;

export const ListRowAgendar = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin-bottom: 10px;
`;

export const LeftRow = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const RightRow = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const Avatar = styled.Image`
    margin-bottom: 20px ;
    width: 50px;
    height: 50px;
    border-radius: 100px;
`;