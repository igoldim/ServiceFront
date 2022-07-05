import React from "react";
import { SearchListProps } from "../../interfaces";
import BigText from "../Texts/BigText";
import SearchResultListItem from "./SearchResultListItem";
import { Container, StyledFlatList } from "./StyledList.s";

const SearchResultList: React.FC<SearchListProps> = ( props ) => {
    return (
        <Container>
            <StyledFlatList 
                style={props.style}
                data={props.data} 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{
                    paddingBottom: 25
                }}
                keyExtractor={({ id }: any )=> id.toString()}
                renderItem={({ item }: any ) => <SearchResultListItem 
                                                    {...item} 
                                                    primaryColor={props.primaryColor} 
                                                    secondColor={props.secondColor}
                                                    onPress={props.onPress}
                                                    />}
                />
        </Container>
    );
}
export default SearchResultList;