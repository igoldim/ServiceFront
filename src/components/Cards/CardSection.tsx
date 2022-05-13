import React from 'react';
import { Users } from '../Modals/ModalScheduling';
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
            keyExtractor={({id}:any) => id}
            renderItem={({item}: any) => <CardItem {...item} />}
            />
    );
};  

export default CardSection;