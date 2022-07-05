import React from "react";
import { FavoritesList, FavoritesSectionBackground } from "./Favorites.s";
import { FavoritesSectionProps} from "../../types/AppType";
import FavoritesItem from "./FavoritesItem";

const FavoriteList: React.FC<FavoritesSectionProps> = ( props ) => {

    return (
        <FavoritesSectionBackground>
            <FavoritesList data={props.data} 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{
                    paddingBottom: 25
                }}
                keyExtractor={({ id }: any )=> id.toString()}
                renderItem={({ item }: any ) => <FavoritesItem {...item} />}
            />
        </FavoritesSectionBackground>
    );
};  

export default FavoriteList;