import React from "react";
import { TFavoritesSectionProps } from "../../types/AppType";
import { FavoritesList, FavoritesSectionBackground } from "./Favorites.s";
import FavoritesItem from "./FavoritesItem";
import { ActivityIndicator, View } from "react-native";
import { Container } from "../Shared";

const FavoriteList: React.FC<TFavoritesSectionProps> = ( props ) => {

    return (
        <View style={{marginTop: 15}}>
            {props.isLoading && 
            <ActivityIndicator size={30} color="#fff" />
            }
            {!props.isLoading && 
            <FavoritesList data={props.data} 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{
                    paddingBottom: 25
                }}
                keyExtractor={({ id }: any )=> id.toString()}
                renderItem={({ item }: any ) => <FavoritesItem {...item} />}
            />
            }
        </View>
    );
};  

export default FavoriteList;