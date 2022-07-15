import React from "react";
import CardSection from "../../../components/Cards/CardSection";
import ScreenHeadUser from "../../../components/Head/ScreenHeadUser";
import SearchInput from "../../../components/Input/SearchInput";
import MessageAlertModal from "../../../components/Modals/MessageAlertModal";
import BigText from "../../../components/Texts/BigText";
import RegularText from "../../../components/Texts/RegularText";
import TransactionSection from "../../../components/Transaction/TransactionSection";
import { cleanData, useAppData } from "../../../services";
import { ScreensProps, TServices, TUser } from "../../../types/AppType";
import { fetchData } from "../service";
import { Container } from "./TakerDashboard.s";

const TakerDashboard: React.FC<ScreensProps> = ({navigation}) => {
    const [name, setName] = React.useState("Usuário");
    const [avatar, setAvatar] = React.useState("");
    const [data, setData] = React.useState<TUser>();

    const [dataSchedule, setDataSchedule] = React.useState<Array<TServices> | null>( []);
    const [dataServices, setDataServices] = React.useState<Array<TServices> | null>( [] );

    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    const [visible, setVisible] = React.useState(false);
    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [messageModal, setMessageModal] = React.useState('');
    const [type, setType] = React.useState("erro");

    const [isLoading, setLoading] = React.useState(false);
    
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

        var reponse = await fetchData({id: userId,  appid: appKey}); 
        if (reponse){
            const {sucessful, data, message} = reponse;
            if (sucessful){
                setData(data);       
                setDataSchedule(data?.servicesAgendados);         
                setDataServices(data?.servicesConcluido);          
                setLoading(false);
            }
        }
        else{
            setLoading(false);
            showModal("Segurança", "suas credênciais expiraram, precisamos que você efetue novamente seu login.", "erro");
            cleanData();
        }

    };
    const modalButtonHandle = () =>{
        setVisible(false);
        navigation.navigate("SignIn");
    }

    const showModal = (headText: string, message: string, type: string)=> {
        setMessageHeadding(headText);
        setMessageModal(message);
        setType(type);
        setVisible(true);
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
                    onSearchButton={() => navigation.navigate('Resultado')} 
                    iconeName='account-search-outline'
                    iconeColor={secondColor}
                    placeholder="Buscar prestador de serviço"
                    placeholderColor={primaryColor}
                    inputStyles={{                       
                        color: primaryColor, 
                        fontSize: 17.8, 
                        fontWeight: '800',
                    }}
                    ViewStyles={{
                        backgroundColor: secondColor, 
                    }}
                    iconStyles={{backgroundColor: primaryColor}}
                    onLocationhButton={() => navigation.navigate('Resultado')} 
                /> 
                <BigText textStyles={{color: secondColor, fontSize: 28, fontWeight: '800'}}>Total de Serviços</BigText>  
                <RegularText textStyles={{color: secondColor, fontSize: 28, fontWeight: '400'}}>R$ {data?.amount}</RegularText> 

                <CardSection refreshing={isLoading} onRefresh={loadData}  data={dataSchedule as Array<TServices>} primaryColor={primaryColor} secondColor={secondColor} />

                <TransactionSection refreshing={isLoading} onRefresh={loadData}  data={dataServices as Array<TServices>} title={"Serviços"} subtitle={"Recentes"} primaryColor={primaryColor} secondColor={secondColor}/>
           
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