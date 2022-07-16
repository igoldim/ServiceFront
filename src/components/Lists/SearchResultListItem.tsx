import React from 'react';
import { SearchListItemProps } from '../../interfaces';
import RegularText from '../Texts/RegularText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar, ListContainer, ListFooter, ListFooterItem, ListHead, ListStatus, ListStatusRodape } from './StyledList.s';
import Stars from '../Stars';
import { Image, View } from 'react-native';

const SearchResultListItem: React.FC<SearchListItemProps> = ( props ) => {
    return (
        <ListContainer style={{backgroundColor: props.secondColor}} onPress={props.onPress}>
            <ListHead>               
                <Stars 
                    isSave={false} 
                    onPress={() => {}}  
                    value={props.stars} 
                    showNumber={false}                     
                    width="20" 
                    height='20' 
                    startStyle={{marginBottom: 10, alignSelf: 'center'}}
                    color={props.primaryColor}
                    />
                    <ListStatus>
                        <RegularText textStyles={{
                                color: props.primaryColor,
                                fontSize: 20,
                                textAlign: 'left',
                                fontWeight:'800'                    
                            }}>
                         R$ {props.amount?.toString()}
                        </RegularText>
                    </ListStatus>
            </ListHead>
            <ListFooter>                
               <ListFooterItem>
                    <View style={{paddingLeft: 5}}>      
                        <RegularText textStyles={{
                                            color: props.primaryColor,
                                            fontSize: 24,
                                            textAlign: 'left',
                                            fontWeight:'800'                    
                                        }}>
                                        {props.name}
                        </RegularText>
                    </View>
                    <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', alignContent: 'center'}}>
                        <ListStatusRodape>
                            <Icon name="google-maps" size={24} color={props.primaryColor} />
                            <RegularText textStyles={{
                                    color: props.primaryColor,
                                    fontSize: 18,
                                    textAlign: 'left',
                                    fontWeight:'800'                    
                                }}>
                                {props.distance?.toString()} Km
                            </RegularText>
                        </ListStatusRodape>    
                        <ListStatusRodape>
                            <Avatar source={{uri: props.avatar as string}} style={{backgroundColor: props.primaryColor}}  />             
                        </ListStatusRodape>
                    </View>
                </ ListFooterItem>               
            </ ListFooter>           
        </ListContainer>
    );
}

export default SearchResultListItem;