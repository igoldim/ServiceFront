import React from "react";
import FavoriteList from "../../../components/Favorites/FavoriteList";
import ScreenHead from "../../../components/Head/ScreenHead";
import { Container } from "../../../components/Shared";
import { useAppData } from "../../../services";
import { TFavoriteData, ScreensProps } from "../../../types/AppType";
import { fetchFavorite } from '../services/index'

const Favorites: React.FC<ScreensProps> = ({navigation}) =>{
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");
    const [favoriteData, setfavoriteData] = React.useState<Array<TFavoriteData>>();
    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() =>{
    loadData();
  },[]);

  const loadData = async () => {

    const {primaryColor:strPrimaryColor, secondColor: strSecondColor, userId, appKey } = await useAppData();
    setPrimaryColor(strPrimaryColor); 
    setSecondColor(strSecondColor); 

    setLoading(true);
    //carrega favoritos do usuário
    const {sucessful, data, message} = await fetchFavorite({userId, appId: appKey});
    
    //console.log(data.favoriteProfessionals);

    if (sucessful){
      setfavoriteData(data.favoriteProfessionals as Array<TFavoriteData>);
    }
    setLoading(false);
  };
  
    return (
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                screenName="Favoritos"  
                onPress={() => navigation.navigate("Menu")}
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true} />
            <FavoriteList data={favoriteData as Array<TFavoriteData>} isLoading={isLoading}/>
        </Container>
    );
}

export default Favorites;