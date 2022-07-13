import React from "react";
import ScreenHead from "../../../components/Head/ScreenHead";
import { Container, Row } from "../../../components/Shared";
import { useAppData } from "../../../services";
import { ScreensProps, TSearch } from "../../../types/AppType";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import SmallText from "../../../components/Texts/SmallText";
import SearchResultList from "../../../components/Lists/SearchResultList";

const Resultado: React.FC<ScreensProps> = ({navigation}) =>{

    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");
    const [visible, setVisible] = React.useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);

    React.useEffect(() =>{
    
        const loadData = async () => {
        const {primaryColor:strPrimaryColor, secondColor: strSecondColor } = await useAppData();

        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 
        };
        
        loadData();

    },[]);


    const searchResult : Array<TSearch> = [
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af097",
            name:"Igor Goldim",
            avatar: "https://imagens.circuit.inf.br/noAvatar.png",            
            amount: "100,00",
            stars: 5,
            distance :10
        },
        {
            id: "2cb32ade-ac5d-50b5-bf25-b135c85af097",
            name:"Augusto Oliveira",
            avatar: "https://imagens.circuit.inf.br/noAvatar.png",            
            amount: "120,00",
            stars: 4,
            distance :14
        },
        {
            id: "2cb32ade-ac5d-50b5-bf25-sdcdc85af097",
            name:"Igor Augusto",
            avatar: "https://imagens.circuit.inf.br/noAvatar.png",            
            amount: "100,00",
            stars: 5,
            distance :20
        },
    ];


    return (
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                screenName="Resultado"  
                onPress={() => navigation.navigate("Menu")}
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true}
                onRightPress={showMenu} 
                showRightMenu={true}
            >
                <Menu
                    style={{backgroundColor: secondColor}}
                    visible={visible}
                    anchor={ <Icon name={'options-vertical'} size={20} color={secondColor} />}
                    onRequestClose={hideMenu}
                >
                    <MenuItem disabled><SmallText textStyles={{color: primaryColor, fontSize: 14, fontWeight:'600'}} >Ordernar por:</SmallText></MenuItem>
                    <MenuDivider />
                    <MenuItem pressColor={primaryColor} onPress={hideMenu}><SmallText textStyles={{color: primaryColor}} >Avaliação</SmallText></MenuItem>
                    <MenuItem pressColor={primaryColor} onPress={hideMenu}><SmallText textStyles={{color: primaryColor}} >Distância</SmallText></MenuItem>
                    <MenuItem pressColor={primaryColor} onPress={hideMenu}><SmallText textStyles={{color: primaryColor}} >Valor</SmallText></MenuItem>
                </Menu>
            </ScreenHead>

            <SearchResultList 
                style={{marginTop: 15}}
                data={searchResult} 
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                onPress={() => navigation.navigate("Agendar")}
            />
            
        </Container>
    );
}

export default Resultado;