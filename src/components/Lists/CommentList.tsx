import React from "react";
import { CommentProps } from "../../interfaces";
import { Container } from "../Shared";
import CommentItem from "./CommentItem";
import { CardCommentList,} from "./StyledList.s";

const CommentList: React.FC<CommentProps> = ( props ) => {
    return (
        <Container>
        <CardCommentList 
            data={props.data} 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
            }}
            onRefresh={props.onRefresh}
            refreshing={props.refreshing}
            keyExtractor={({id}:any) => id}
            renderItem={({item}: any) =>    <CommentItem 
                                                {...item} 
                                                primaryColor={props.primaryColor} 
                                                secondColor={props.secondColor}
                                            />}
        />
        </Container>

    );
}
export default CommentList;