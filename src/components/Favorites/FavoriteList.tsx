import React from "react";
import { View } from "react-native";
import { TFavoritesSectionProps } from "../../types/AppType";
import { FavoritesList } from "./Favorites.s";
import FavoritesItem from "./FavoritesItem";

const FavoriteList: React.FC<TFavoritesSectionProps> = ( props ) => {

    return (
        <View style={{marginTop: 15}}>
            <FavoritesList data={props.data} 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{
                    paddingBottom: 25
                }}
                onRefresh={props.onRefresh}
                refreshing={props.refreshing}
                keyExtractor={({ id }: any )=> id.toString()}
                renderItem={({ item }: any ) => <FavoritesItem {...item} />}
            />
        </View>
    );
};  

export default FavoriteList;