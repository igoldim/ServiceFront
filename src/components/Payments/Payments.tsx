import { ServicesList, ServicesSectionBackground } from "./Payments.s";
import React from "react";
import { PaymentsProps } from "../../interfaces";
import PaymentsItem from "./PaymentsItem";

const Payments: React.FC<PaymentsProps> = ( props ) => {

    return (            
            <ServicesList data={props.data} 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{
                    paddingBottom: 25
                }}
                keyExtractor={({ id }: any )=> id.toString()}
                renderItem={({ item }: any ) => <PaymentsItem {...item} primaryColor={props.primaryColor} secondColor={props.secondColor} />}
            />
    );
};  

export default Payments;