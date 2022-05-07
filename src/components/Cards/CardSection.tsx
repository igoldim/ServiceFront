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
            keyExtractor={({id}:any) => id}
            renderItem={({item}: any) => <CardItem 
                                            id={item.id} 
                                            userName={item.userName}
                                            userAddress={item.userAddress}
                                            userAddressDistrict={item.userAddressDistrict}
                                            userAddressCity={item.userAddressCity}
                                            userAddressState={item.userAddressState}
                                            userAddressComplement={item.userAddressComplement}
                                            userImage={item.userImage}
                                            scheduleDate={item.scheduleDate}
                                            scheduleTime={item.scheduleTime}
                                            key={item.id} />}
            />
    );
};  

export default CardSection;