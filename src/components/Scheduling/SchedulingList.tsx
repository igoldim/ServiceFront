import { ServicesList } from "./Scheduling.s";
import React from "react";
import { ServicesSectionProps } from "../../interfaces";
import SchedulingItem from "./SchedulingItem";

const SchedulingList: React.FC<ServicesSectionProps> = ( props ) => {

    return (
            <ServicesList data={props.data} 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{
                    paddingBottom: 25
                }}
                onRefresh={props.onRefresh}
                refreshing={props.refreshing}
                keyExtractor={({ id }: any )=> id.toString()}
                renderItem={({ item }: any ) => <SchedulingItem {...item} primaryColor={props.primaryColor} secondColor={props.secondColor}/>}
            />
    );
};  

export default SchedulingList;