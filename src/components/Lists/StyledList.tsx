import React from "react";
import { AgendaProps } from "../../interfaces";
import BigText from "../Texts/BigText";
import ListItem from "./ListItem";
import { Container, StyledFlatList } from "./StyledList.s";

const StyledList: React.FC<AgendaProps> = ( props ) => {
    return (
        <Container>
            <BigText textStyles={{color: props.secondColor, fontSize: 24, fontWeight: '800'}}>Agendas</BigText> 
            <StyledFlatList 
                style={props.style}
                data={props.data} 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{
                    paddingBottom: 25
                }}
                onRefresh={props.onRefresh}
                refreshing={props.refreshing}
                keyExtractor={({ id }: any )=> id.toString()}
                renderItem={({ item }: any ) => <ListItem 
                                                    {...item} 
                                                    primaryColor={props.primaryColor} 
                                                    secondColor={props.secondColor}
                                                    onPressEdit={props.onPressEdit}
                                                    onPressDelete={props.onPressDelete}
                                                    />}
                />
        </Container>
    );
}
export default StyledList;