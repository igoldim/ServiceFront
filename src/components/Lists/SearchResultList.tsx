import React from "react";
import { SearchListProps } from "../../interfaces";
import SearchResultListItem from "./SearchResultListItem";
import { StyledFlatList } from "./StyledList.s";

const SearchResultList: React.FC<SearchListProps> = ( props ) => {
    return (
            <StyledFlatList 
                style={props.style}
                data={props.data} 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{
                    paddingBottom: 25
                }}
                onRefresh={props.onRefresh}
                refreshing={props.refreshing}
                keyExtractor={({ id }: any )=> id.toString()}
                renderItem={({ item }: any ) => <SearchResultListItem 
                                                    {...item} 
                                                    primaryColor={props.primaryColor} 
                                                    secondColor={props.secondColor}
                                                    onPress={props.onPress}
                                                    />}
                />
    );
}
export default SearchResultList;