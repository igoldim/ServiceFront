import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import { Alert } from "react-native";
import GetLocation from "react-native-get-location";
import CardSection from "../../../components/Cards/CardSection";
import ScreenHeadUser from "../../../components/Head/ScreenHeadUser";
import SearchInput from "../../../components/Input/SearchInput";
import MessageAlertModal from "../../../components/Modals/MessageAlertModal";
import BigText from "../../../components/Texts/BigText";
import RegularText from "../../../components/Texts/RegularText";
import TransactionSectionTaker from "../../../components/Transaction/TransactionSectionTaker";
import { cleanData, useAppData } from "../../../services";
import { ScreensProps, TServices, TUser } from "../../../types/AppType";
import { fetchData } from "../service";
import { Container } from "./TakerDashboard.s";

const TakerDashboard: React.FC<ScreensProps> = ({navigation}) => {
    const [name, setName] = React.useState("Usuário");
    const [avatar, setAvatar] = React.useState("");
    const [serachValue, setSerachValue] = React.useState("");
    
    const [data, setData] = React.useState<TUser>();

    const [dataSchedule, setDataSchedule] = React.useState<Array<TServices> | null>( []);
    const [dataServices, setDataServices] = React.useState<Array<TServices> | null>( [] );

    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    const [visible, setVisible] = React.useState(false);

    const [temLocation, setTemLocation] = React.useState(false);
    const [temConnection, setTemConnection] = React.useState(false);

    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [messageModal, setMessageModal] = React.useState('');
    const [type, setType] = React.useState("erro");

    const [isLoading, setLoading] = React.useState(false);
    const [locationIsLoading, setLocationIsLoading] = React.useState(false);
    
    React.useEffect(() =>{
        loadData();
    },[]);


    const loadData = async () => {
        setLoading(true);
        const {primaryColor:strPrimaryColor, secondColor: strSecondColor, Name, userId, appKey, Avatar} = await useAppData();
        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 
        setName(Name);
        setAvatar(Avatar);

        await AsyncStorage.removeItem('q');

        var reponse = await fetchData({id: userId,  appid: appKey}); 
        if (reponse){
            setTemConnection(true);
            const {sucessful, data, message} = reponse;
            if (sucessful){
                setData(data);       
                setAvatar(data.avatar!);
                await AsyncStorage.setItem("Avatar", data.avatar! as string);
                setDataSchedule(data?.servicesAgendados);         
                setDataServices(data?.servicesConcluido);          
                setLoading(false);
            }
        }
        else{
            setTemConnection(false);
            setLoading(false);
            showModal("Segurança", "suas credênciais expiraram, precisamos que você efetue novamente seu login.", "erro");
            cleanData();
        }
    };

    const modalButtonHandle = () =>{
        setVisible(false);
        loadData();
        if (!temConnection){
            navigation.reset({
                index: 1,
                routes: [
                  { name: 'SignIn' },
                ],
              });
        }
    }

    const showModal = (headText: string, message: string, type: string)=> {
        setMessageHeadding(headText);
        setMessageModal(message);
        setType(type);
        setVisible(true);
    }

    const handleSearching = async () => {

        if (serachValue === ""){
            showModal("Busca", "informe pelo menos uma letra para pesquisar.", "erro");
            return false;
        }

        AsyncStorage.setItem('searchByLocation', "false");
        AsyncStorage.setItem('q', serachValue);
        navigation.reset({
            index: 1,
            routes: [
              { name: 'Resultado' },
            ],
        });
    } 

    const handleLocation = async () => {
        setLocationIsLoading(true);
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
          })
          .then(async location =>  {
            setLocationIsLoading(false);
            setTemLocation(true);
            await AsyncStorage.setItem('searchByLocation', "true");
            await AsyncStorage.setItem('q', serachValue);
            await AsyncStorage.setItem('latitude', `${location.latitude}`);
            await AsyncStorage.setItem('longitude', `${location.longitude}`);     

            //pesquisa com base na localização passando lat and lon
            navigation.reset({
                index: 1,
                routes: [
                  { name: 'Resultado' },
                ],
            });
          })
          .catch(async error => {
            setLocationIsLoading(false);
            setTemLocation(false);
            const { code, message } = error;
            showModal("Localização", message, "erro");
            return false;            
          });
    } 


    return (
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHeadUser 
                userName={name.split(" ")[0]}  
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                avatar={avatar}
                showIcon={true}
                onPress={() => 
                    navigation.reset({
                        index: 1,
                        routes: [
                          { name: 'Menu' },
                        ],
                      })}
            />

            <SearchInput
                    locationIsLoading={locationIsLoading}
                    onSearchButton={handleSearching} 
                    iconeName='account-search-outline'
                    iconeColor={secondColor}
                    placeholder="Buscar prestador de serviço"
                    placeholderColor={primaryColor}
                    inputStyles={{                       
                        color: primaryColor, 
                        fontSize: 17, 
                        fontWeight: '600',
                    }}
                    ViewStyles={{
                        backgroundColor: secondColor, 
                    }}
                    iconStyles={{backgroundColor: primaryColor}}
                    onLocationhButton={handleLocation} 
                    value={serachValue}
                    onChangeText={setSerachValue}
            /> 

            <BigText textStyles={{color: secondColor, fontSize: 28, fontWeight: '700'}}>Total de Serviços</BigText>  

            <RegularText textStyles={{color: secondColor, fontSize: 28, fontWeight: '400'}}>R$ {data?.amount}</RegularText> 

            <CardSection refreshing={isLoading} onRefresh={loadData}  data={dataSchedule as Array<TServices>} primaryColor={primaryColor} secondColor={secondColor} />

            <TransactionSectionTaker refreshing={isLoading} onRefresh={loadData}  data={dataServices as Array<TServices>} title={"Serviços"} subtitle={"Recentes"} primaryColor={primaryColor} secondColor={secondColor}/>
           
            <MessageAlertModal 
                visible={visible} 
                heading={messageHeadding} 
                message={messageModal} 
                onPress={modalButtonHandle}
                type={type}
                primaryColor={primaryColor}
                secondColor={secondColor}                
            />               
        </Container>);
}

export default TakerDashboard;