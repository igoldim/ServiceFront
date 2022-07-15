import React from 'react';
import { TFavoriteData } from '../../types/AppType';
import RegularText from '../Texts/RegularText';
import { FavoritesButton, FavoritesDate, FavoritesFooter, FavoritesFooterItem, FavoritesHead, FavoritesRow, Favoritestatus, FavoritesValor } from './Favorites.s';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppData } from '../../services';
import Stars from '../Stars';
import { useNavigation } from '@react-navigation/native';


const FavoritesItem: React.FC<TFavoriteData> = ( props ) => {
    const navigation = useNavigation();

    return (
        <FavoritesRow style={{backgroundColor: props.secondColor}}>            
            <FavoritesHead>
                <RegularText textStyles={{
                        color: props.primaryColor,
                        textAlign: 'left',
                        fontWeight:'800'                    
                    }}>
                    {props.professional.name?.toString()}
                </RegularText>  
                <Favoritestatus style={{backgroundColor: props.primaryColor}}>
                <Stars 
                    isSave={false} 
                    onPress={() => {}}  
                    value={Math.round(props.professional.servicesConcluido.reduce((a, b) => a + parseFloat(b.rateValue) , 0) / props.professional.servicesConcluido.length)} 
                    showNumber={false} 
                    width="15" 
                    height='15' 
                    startStyle={{marginTop: 10, marginBottom: 10, alignSelf: 'center'}}
                    color={props.secondColor}
                    />
               </Favoritestatus>                                         
            </FavoritesHead>
            <FavoritesDate>
                <RegularText textStyles={{
                            color: props.primaryColor,
                            fontSize: 16,
                            textAlign: 'left',
                            fontWeight:'400'                    
                        }}>
                        {props.scheduleDateTime}
                </RegularText>
            </FavoritesDate>
            <FavoritesFooter>
               <FavoritesFooterItem>
                <FavoritesValor>
                        <RegularText textStyles={{
                                color: props.primaryColor,
                                fontSize: 20,
                                textAlign: 'left',
                                fontWeight:'400'                    
                            }}>
                            Valor
                        </RegularText>
                        <RegularText textStyles={{
                                color: props.primaryColor,
                                fontSize: 24,
                                textAlign: 'left',
                                fontWeight:'800'                    
                            }}>
                            {props.amountValue?.toString()}
                        </RegularText>
                </ FavoritesValor>                
               </ FavoritesFooterItem>               
               <FavoritesButton  style={{backgroundColor: props.primaryColor}} onPress={() => navigation.navigate("Agendar")}>
                 <Icon name="arrow-right-thick"  size={30} color={props.secondColor} />
               </FavoritesButton>      
            </ FavoritesFooter>           
        </FavoritesRow>
    );
}

export default FavoritesItem;