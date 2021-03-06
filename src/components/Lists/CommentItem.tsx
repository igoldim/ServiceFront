import React from 'react';
import { CommentItemProps } from '../../interfaces';
import RegularText from '../Texts/RegularText';
import { Avatar, CommentItemContainer, ListContainer, ListFooter, ListFooterItem, ListHead, ListStatus, ListStatusRodape } from './StyledList.s';
import Stars from '../Stars';
import {View } from 'react-native';

const CommentItem: React.FC<CommentItemProps> = ( props ) => {
    return (
        <CommentItemContainer style={{backgroundColor: props.secondColor}}>
            <ListHead>               
                <Stars 
                    isSave={false} 
                    onPress={() => {}}  
                    value={props.stars} 
                    showNumber={false}                     
                    width="20" 
                    height='20' 
                    startStyle={{marginBottom: 35, alignSelf: 'center'}}
                    color={props.primaryColor}
                    />
                    <ListStatus>
                        <Avatar source={{uri: props.service.user.avatar as string}} style={{backgroundColor: props.primaryColor}}  />             
                    </ListStatus>
            </ListHead>
            <ListFooter style={{marginTop: -25}}>                
               <ListFooterItem>
                    <View style={{paddingLeft: 5}}>      
                        <RegularText textStyles={{
                                            color: props.primaryColor,
                                            fontSize: 24,
                                            textAlign: 'left',
                                            fontWeight:'800'                    
                                        }}>
                                        {props.service.user.name}
                        </RegularText>
                    </View>
                    <RegularText textStyles={{
                                    padding: 10,
                                    color: props.primaryColor,
                                    fontSize: 16,
                                    textAlign: 'left',
                                    fontWeight:'400'                    
                                }}>
                                {props.commentary}
                            </RegularText>
                </ ListFooterItem>               
            </ ListFooter>           
        </CommentItemContainer>
    );
}

export default CommentItem;