import { ServicesList, ServicesSectionBackground } from "./Services.s";
import ServicesItem from "./ServicesItem";
import React from "react";
import { ServicesSectionProps } from "../../interfaces";
import { Container } from "../Shared";

const Services: React.FC<ServicesSectionProps> = ( props ) => {

    return (
            <ServicesList data={props.data} 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{
                    paddingBottom: 25
                }}
                keyExtractor={({ id }: any )=> id.toString()}
                renderItem={({ item }: any ) => <ServicesItem {...item} />}
            />
    );
};  

export default Services;