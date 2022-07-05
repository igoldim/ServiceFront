import React from "react";
import { CommentProps } from "../../interfaces";
import CommentItem from "./CommentItem";
import { CardCommentList,} from "./StyledList.s";

const CommentList: React.FC<CommentProps> = ( props ) => {
    return (
        <CardCommentList 
            data={props.data} 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingRight: 25,
                alignItems: "center"
            }}
            keyExtractor={({id}:any) => id}
            renderItem={({item}: any) =>    <CommentItem 
                                                {...item} 
                                                primaryColor={props.primaryColor} 
                                                secondColor={props.secondColor}
                                            />}
        />


    );
}
export default CommentList;