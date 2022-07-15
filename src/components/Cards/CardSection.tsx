import React from 'react';
import CardItem from './CardItem';
import { CardList } from './CardSection.s';
import { CardSectionProps } from './CardSection.t';

const CardSection: React.FC<CardSectionProps> = (props) => {
    return(
        <CardList 
            data={props.data} 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingRight: 25,
                alignItems: "center"
            }}
            onRefresh={props.onRefresh}
            refreshing={props.refreshing}
            keyExtractor={({id}:any) => id}
            renderItem={({item}: any) => <CardItem item={item} primaryColor={props.primaryColor} secondColor={props.secondColor} />}
            />
    );
};  

export default CardSection;