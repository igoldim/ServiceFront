import React from "react";
import ScreenHead from "../../../components/Head/ScreenHead";
import { Container, Row } from "../../../components/Shared";
import { cleanData, useAppData } from "../../../services";
import { ScreensProps, TSearch, TUser } from "../../../types/AppType";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import SmallText from "../../../components/Texts/SmallText";
import SearchResultList from "../../../components/Lists/SearchResultList";
import AsyncStorage from "@react-native-community/async-storage";
import { fetchSearchByLocation, fetchSearchByQ } from "../services";
import MessageAlertModal from "../../../components/Modals/MessageAlertModal";

const Resultado: React.FC<ScreensProps> = ({navigation}) =>{

    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");
    const [visible, setVisible] = React.useState(false);

    const [visibleMenu, setVisibleMenu] = React.useState(false);

    const [searchResult, setSearchResult ] = React.useState<Array<TSearch> | null>(null);
    const [isLoading, setLoading] = React.useState(false);

    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [messageModal, setMessageModal] = React.useState('');
    const [type, setType] = React.useState("erro");

    const [temConnection, setTemConnection] = React.useState(false);

    const hideMenu = () => setVisibleMenu(false);
    const showMenu = () => setVisibleMenu(true);

    React.useEffect(() =>{
        loadData();
    },[]);

    const loadData = async () => {
        setLoading(true);
        const {primaryColor:strPrimaryColor, secondColor: strSecondColor, userId, appKey: appId } = await useAppData();
        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 

        const searchByLocation =  await AsyncStorage.getItem('searchByLocation');

        const q = await AsyncStorage.getItem('q') as string;
        const latitude = await AsyncStorage.getItem('latitude')  as string;
        const longitude = await AsyncStorage.getItem('longitude')  as string;
        
        //console.log(`${latitude} ${longitude}`);
        //console.log(searchByLocation);

        if (searchByLocation == "true"){
            const reponse  = await fetchSearchByLocation({userId, appId, query: q, latitude, longitude, distance: 10});
            if (reponse){
                //console.log(reponse);
                setTemConnection(true);
                const {sucessful, data, message} = reponse;
                if (sucessful){
                    setSearchResult(data);       
                    setLoading(false);
                }
                else {
                    showModal("Busca", "não localizamos nenhum registro com os dados fornecidos", "erro");
                }
            }
            else{
                setTemConnection(false);
                setLoading(false);
                showModal("Segurança", "suas credênciais expiraram, precisamos que você efetue novamente seu login.", "erro");
                cleanData();
            }
        }
        else{
            const reponse  = await fetchSearchByQ({userId, appId, query: q, latitude, longitude, distance: 10});
            //console.log(reponse);

            if (reponse){
                //console.log(reponse);
                setTemConnection(true);
                const {sucessful, data, message} = reponse;
                if (sucessful){
                    setSearchResult(data);       
                    setLoading(false);
                }
                else {
                    showModal("Busca", "não localizamos nenhum registro com os dados fornecidos", "erro");
                }
            }
            else{
                setTemConnection(false);
                setLoading(false);
                showModal("Segurança", "suas credênciais expiraram, precisamos que você efetue novamente seu login.", "erro");
                cleanData();
            }
        }

        setLoading(false);
    };

    const modalButtonHandle = () =>{
        setVisible(false);
        if (!temConnection){
            navigation.navigate("SignIn");
        }
    }

    const showModal = (headText: string, message: string, type: string)=> {
        setMessageHeadding(headText);
        setMessageModal(message);
        setType(type);
        setVisible(true);
    }

    return (
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                screenName="Resultado"  
                onPress={() => navigation.navigate("TakerDashboard")}
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true}
                onRightPress={showMenu} 
                showRightMenu={true}
            >
                <Menu
                    style={{backgroundColor: secondColor}}
                    visible={visibleMenu}
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
                data={searchResult as Array<TSearch>} 
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                onPress={() => navigation.navigate("Agendar")}
                onRefresh={loadData}
                refreshing={isLoading}
            />

            <MessageAlertModal 
                visible={visible} 
                heading={messageHeadding} 
                message={messageModal} 
                onPress={modalButtonHandle}
                type={type}
                primaryColor={primaryColor}
                secondColor={secondColor}                
            />  
        </Container>
    );
}

export default Resultado;