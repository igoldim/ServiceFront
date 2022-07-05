import { ServicesList, ServicesSectionBackground } from "./Services.s";
import { ServicesSectionProps} from "../../types/AppType";
import ServicesItem from "./ServicesItem";
import React from "react";

const Services: React.FC<ServicesSectionProps> = ( props ) => {

    return (
        <ServicesSectionBackground>
            <ServicesList data={props.data} 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{
                    paddingBottom: 25
                }}
                keyExtractor={({ id }: any )=> id.toString()}
                renderItem={({ item }: any ) => <ServicesItem {...item} />}
            />
        </ServicesSectionBackground>
    );
};  

export default Services;