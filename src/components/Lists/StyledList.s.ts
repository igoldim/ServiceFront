import styled from "styled-components/native";
import { ScreenHeight, ScreenWidth } from "../Shared";

export const Container = styled.View`
    flex: 1;
    width: 100%;
`;


export const CardCommentList = styled.FlatList`
    width: 100%;
`;

export const StyledFlatList = styled.FlatList`
    width: 100%;
`;

export const ListContainer = styled.TouchableOpacity`
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 5px;
    padding: 10px;
`;

export const CommentItemContainer = styled.View`
    width: ${ScreenHeight * 0.42}px;
    border-radius: 5px;
    margin-right: 10px;
    overflow: hidden;
    padding: 10px;
`;


export const ListHead = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
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
    width: 50px;
    height: 50px;
    border-radius: 100px;
`;