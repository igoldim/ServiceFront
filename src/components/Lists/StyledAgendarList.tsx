import React from "react";
import {AgendarProps } from "../../interfaces";
import AgendarListItem from "./AgendarListItem";
import { StyledFlatList } from "./StyledList.s";

const StyledAgendarList: React.FC<AgendarProps> = ( props ) => {
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
                renderItem={({ item }: any ) => <AgendarListItem 
                                                    {...item} 
                                                    primaryColor={props.primaryColor} 
                                                    secondColor={props.secondColor}
                                                    onPress={props.onPress}
                                                    />}
                />
    );
}
export default StyledAgendarList;