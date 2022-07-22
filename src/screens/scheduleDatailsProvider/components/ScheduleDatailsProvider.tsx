import React, { LegacyRef, MutableRefObject } from 'react';
import ScreenHead from '../../../components/Head/ScreenHead';
import { Container, Row } from '../../../components/Shared';
import { cleanData, useAppData } from '../../../services';
import { ActivityIndicator, Alert, Dimensions, StatusBar, StyleSheet } from "react-native";
import RegularButton from '../../../components/Buttons/RegularButton';
import BigText from '../../../components/Texts/BigText';
import RegularText from '../../../components/Texts/RegularText';
import { fetchCancelAgendamento, fetchUpgendamento } from '../../takerDashboard/service';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Coordinates, ScreensProps, TServices } from '../../../types/AppType';
import { ModalPressableContainer, ModalView, StyledImage } from './ScheduleDatailsProvider.s';
import AsyncStorage from '@react-native-community/async-storage';
import MessageAlertModal from '../../../components/Modals/MessageAlertModal';
import { fetchGetAgendamentoTaker } from '../../providerDashboard/service';
import Icon from 'react-native-vector-icons/Ionicons';
import { getBoundsOfDistance, isPointInPolygon } from 'geolib';

import flagPinkImg from "../../../assets/images/flag-pink.png";
import flagBlueImg from "../../../assets/images/flag-blue.png";
import { TouchableOpacity } from 'react-native-gesture-handler';



const ScheduleDatailsProvider: React.FC<ScreensProps> = (props)  => {
    const map = React.useRef<MapView>();

    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    const [service, setService ] = React.useState<TServices | null>(null);
    const [userName, setUserName] = React.useState<string>("");     
    const [startValue, setStarValue] = React.useState(0);

    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [messageModal, setMessageModal] = React.useState('');
    const [type, setType] = React.useState("erro");
    const [visible, setVisible] = React.useState(false);
    const [temConnection, setTemConnection] = React.useState(false);

    const [isLoading, setLoading] = React.useState(false);

    const navigation = useNavigation();

    const [latitude, setLatitude] = React.useState(0);
    const [longitude, setLongitude] = React.useState(0);

    const [latitudeD, setLatitudeD] = React.useState(0);
    const [longitudeD, setLongitudeD] = React.useState(0);
   
    const {width, height} = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const radius = 10;

    const [latitudeDelta, setLatitudeDelta] = React.useState(0.025);
    const [longitudeDelta, setLongitudeDelta] = React.useState(0.025 * ASPECT_RATIO);

    React.useEffect(() =>{
      loadData();
      handlePosition();
    },[]);

    const loadData = async () => {
        setLoading(true);
        const {primaryColor:strPrimaryColor, secondColor: strSecondColor, userId, appKey: appId, Latitude, Longitude, Name } = await useAppData();
        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 
        setUserName(Name);

        //carrega dados da api
        const serviceId = await AsyncStorage.getItem("serviceId") as string;

        var reponse = await fetchGetAgendamentoTaker({id: serviceId,  userId,  appId}); 
        if (reponse){
            setTemConnection(true);
            const {sucessful, data, message} = reponse;
            if (sucessful){
                setService(data);

                var coord = getRegion(parseFloat(Latitude), parseFloat(Longitude), 10);

                setLatitude(parseFloat(Latitude));
                setLongitude(parseFloat(Longitude));

                setLatitudeD(parseFloat(data.user.latitude as string));
                setLongitudeD(parseFloat(data.user.longitude as string));

                setLatitudeDelta(coord.latitudeDelta);
                setLongitudeDelta(coord.latitudeDelta);
                
                setStarValue(data?.comments?.stars);
                setLoading(false);
            }
        }
        else{
            setTemConnection(false);
            setLoading(false);
            showModal("Segurança", "suas credênciais expiraram, precisamos que você efetue novamente seu login.", "erro");
            cleanData();
        }
        //console.log(serviceId);
    };

    const showModal = (headText: string, message: string, type: string)=> {
        setMessageHeadding(headText);
        setMessageModal(message);
        setType(type);
        setVisible(true);
    }

 
    const modalButtonHandle = async () =>{
        setVisible(false);

        if (!temConnection){
            navigation.reset({
                index: 1,
                routes: [
                    { name: 'SignIn' },
                ],
                });
        }
    }

    const modalMessageHandleTaker = () =>{

        //validar data do agendamento com a data de hoje
        let dataA = service?.schedule.scheduleDateTime.split("T")[0] as string;
        let horaA = service?.schedule.scheduleDateTime.split("T")[1] as string;
        let dia = dataA.split("/")[0];  
        let mes = dataA.split("/")[1];
        let ano = dataA.split("/")[2];
        let dataAgendamento = new Date(`${ano}-${mes}-${dia}T${horaA}`);
        let hoje = new Date();
        
        //let diffDays = Math.floor((dataAgendamento.getTime() - hoje.getTime())/(24*3600*1000));
        //console.log(diffDays);
        //console.log(hoje);

        if (dataAgendamento.getTime() > hoje.getTime()){
            showModal("Data de Agendmaneto", "não se pode inciar atendimento antes da data agendada.", "erro");
            return false;
        }
        else {
            return Alert.alert(
                "Concluir Atendimento",
                "Deseja realmente concluir este atendimento?, está ação não poderá ser desfeita.",
                [
                    // The "Yes" button
                    {
                        text: "Sim",
                        onPress: async () => {
                            const {userId, appKey: appId} = await useAppData();
                            const {sucessful, data, message} = await fetchUpgendamento({id: service?.id as string, userId, appId});

                            if (sucessful){
                                showModal("Sucesso", "Atendimento concluído com sucesso!", "success");
                                loadData();
                            }
                            else{
                                showModal("Erro", message, "erro");
                            }                          
                        },
                    },
                    // The "No" button
                    // Does nothing but dismiss the dialog when tapped
                    {
                        text: "Não",
                    },
                ]
            );
        }
    }

    const modalMessageHandleProvider = () =>{
        return Alert.alert(
            "Iniciar Serviço",
            "Deseja realmente iniciar o atendimento?, está ação não poderá ser desfeito.",
            [
                // The "Yes" button
                {
                    text: "Sim",
                    onPress: () => {
                        showModal("Sucesso", "Atendimento concluído com sucesso!", "succes");
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "Não",
                },
            ]
        );
    }

    const modalMessageHandleCancel = () =>{
            //validar data do agendamento com a data de hoje
            let dataA = service?.schedule.scheduleDateTime.split("T")[0] as string;
            let horaA = service?.schedule.scheduleDateTime.split("T")[1] as string;
            let dia = dataA.split("/")[0];  
            let mes = dataA.split("/")[1];
            let ano = dataA.split("/")[2];
            let dataAgendamento = new Date(`${ano}-${mes}-${dia}T${horaA}`);
            let hoje = new Date();
            
            let diffDays = Math.floor((dataAgendamento.getTime() - hoje.getTime())/(24*3600*1000));
            //console.log(diffDays);
            //console.log(hoje);

            if (diffDays < 1){
                showModal("Cancelamento", "cancelamentos somenete são permitidos com 1 dia de antecedência.", "erro");
                return false;
            }
            else{
                return Alert.alert(
                    "Cancelar Atendimento",
                    "Deseja realmente cancelar o atendimento?, está ação não poderá ser desfeito.",
                    [
                        // The "Yes" button
                        {
                            text: "Sim",
                            onPress: async () => {
                                const {userId, appKey: appId} = await useAppData();
                                const {sucessful, data, message} = await fetchCancelAgendamento({id: service?.id as string, userId, appId});

                                if (sucessful){
                                    showModal("Obrigado", "Atendimento cancelado com sucesso!", "success");
                                }
                                else{
                                    showModal("Cancelamento", message, "erro");
                                }
                            },
                        },
                        // The "No" button
                        // Does nothing but dismiss the dialog when tapped
                        {
                            text: "Não",
                        },
                    ]
                );    
            } 
    }

    const handlePosition = () =>{
        const coordinates = {latitude, longitude};
        const radiusBoundaries = getBoundsOfDistance(coordinates, radius * 1000);
    
        map.current?.fitToCoordinates(radiusBoundaries, {
          edgePadding: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          },
        });
    };

    const handleBack = async () => {
        const rota = await AsyncStorage.getItem("rota") as string;
        //console.log(rota);
        navigation.reset({
            index: 1,
            routes: [
            { name: rota ? rota : "TakerDashboard"},
            ],
        });
    }


    const getDelta = (lat: number, lon: number, distance: number): Coordinates  => {
        const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
 
        const latitudeDelta  = distance / oneDegreeOfLatitudeInMeters;
        const longitudeDelta = distance / (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));
 
        return {
            latitude: lat,
            longitude: lon,
            latitudeDelta,
            longitudeDelta,
        }
    }

    const regionFrom = (lat: number, lon: number, distance: number): Coordinates => {
        distance = distance/2
        const circumference = 40075
        const oneDegreeOfLatitudeInMeters = 111.32 * 1000
        const angularDistance = distance/circumference

        const latitudeDelta = distance / oneDegreeOfLatitudeInMeters
        const longitudeDelta = Math.abs(Math.atan2(
                Math.sin(angularDistance)*Math.cos(lat),
                Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)))

        return {
            latitude: lat,
            longitude: lon,
            latitudeDelta,
            longitudeDelta,
        }
    }

    const getRegion = (lat: number, lon: number, accuracy: number): Coordinates => {
        const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
        const circumference = (40075 / 360) * 1000;
    
        const latDelta = accuracy * (1 / (Math.cos(lat) * circumference));
        const lonDelta = (accuracy / oneDegreeOfLongitudeInMeters);
    
        return {
          latitude: lat,
          longitude: lon,
          latitudeDelta: Math.max(0, latDelta),
          longitudeDelta: Math.max(0, lonDelta)
        };
      }

    return (
          <Container style={{backgroundColor: primaryColor}}>
            <ModalPressableContainer style={{backgroundColor: primaryColor}}>
                  {isLoading  &&  <ActivityIndicator size={30} color="#fff" />}
                  {!isLoading  && <ModalView style={{backgroundColor: secondColor}}>
                        <ScreenHead screenName='Agendamento' showIcon={true} onPress={() => handleBack()} primaryColor={secondColor} secondColor={primaryColor}/>
                        <StatusBar barStyle="light-content" backgroundColor={primaryColor} />
                        {service?.status === "S" &&                        
                        <Row>
                                <RegularButton 
                                    btnStyles={{backgroundColor:  primaryColor, width: '45%', borderRadius: 5, display: 'flex', justifyContent:'center', alignItems: 'center'}}
                                    textStyles={{color: secondColor, fontSize: 24, fontWeight: '500'}}
                                    onPress={modalMessageHandleTaker}>
                                        Concluído
                                </RegularButton>
                                <RegularButton 
                                    btnStyles={{width: '45%', borderColor: primaryColor, borderTopWidth: 1,  borderLeftWidth: 1,  borderRightWidth: 1,  borderBottomWidth: 1 ,backgroundColor: secondColor}}
                                    textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                                    onPress={modalMessageHandleCancel}>
                                        Cancelar
                                </RegularButton>
                        </Row>
                        }
                        {service?.status !== "S"  && 
                        <Row>
                            <BigText textStyles={{fontSize: 25, color: primaryColor, fontWeight: '800'}} >Status: {service?.status === "E" ? "Concluído" : "Cancelado" }</BigText>
                        </Row>                    
                        }
                        <Row>
                            <RegularText textStyles={{fontSize: 25, color: primaryColor, fontWeight: '800'}} >Data</RegularText>
                            <RegularText textStyles={{fontSize: 25, color: primaryColor, fontWeight: '800'}} >Hora</RegularText>
                        </Row>
                        <Row>
                            <RegularText textStyles={{fontSize: 18, color: primaryColor}} > {service?.schedule && service?.schedule.scheduleDateTime?.split("T")[0]}</RegularText>
                            <RegularText textStyles={{fontSize: 18, color: primaryColor}} > {service?.schedule && service?.schedule.scheduleDateTime?.split("T")[1]}</RegularText>
                        </Row>
                        <Row style={{width: '100%'}}>
                            <BigText textStyles={{textAlign: 'left', fontSize: 20, color: primaryColor, marginVertical: 2, fontWeight: 'bold'}} >Nome</BigText>
                            <BigText textStyles={{textAlign: 'left', fontSize: 20, color: primaryColor, marginVertical: 2, fontWeight: 'bold'}} >Valor</BigText>
                        </Row>
                        <Row style={{width: '100%'}}>
                            <RegularText textStyles={{fontSize: 16, color: primaryColor}} >{service?.user.name.split(' ')[0] + ' ' + service?.user.name.split(' ')[service?.user.name.split(' ').length-1]}</RegularText>
                            <RegularText textStyles={{fontSize: 16, color: primaryColor}} >{service?.amountValue && service?.amountValue}</RegularText>
                        </Row>
                        <Row style={{width: '100%'}}>
                            <BigText textStyles={{fontSize: 20, color: primaryColor, marginVertical: 2, fontWeight: 'bold'}} >Endereço</BigText>
                        </Row>
                        <Row style={{width: '100%'}}>
                            <BigText textStyles={{fontSize: 16, color: primaryColor}} >{service?.user.address}{service?.user.number && ', ' + service?.user.number}</BigText>
                        </Row>
                        <Row style={{width: '100%'}}>
                            <BigText textStyles={{fontSize: 16, color: primaryColor}} >{service?.user.district}</BigText>
                        </Row>
                        <Row style={{width: '100%'}}>
                            <BigText textStyles={{fontSize: 16, color: primaryColor}} >{service?.user.complement}</BigText>
                        </Row>
                        <Row style={{width: '100%'}}>
                            <BigText textStyles={{fontSize: 16, color: primaryColor}} >{service?.user.city}{" / " + service?.user.state}</BigText>
                        </Row>

                        <Row style={{width: '100%'}}>
                            <BigText textStyles={{fontSize: 20, color: primaryColor, marginVertical: 10, fontWeight: 'bold'}} >Localização</BigText>                            
                            <TouchableOpacity 
                                onPress={handlePosition}><Icon name='locate' color={primaryColor} size={40} /></TouchableOpacity>
                        </Row>
                        {!isLoading && <>
                        <MapView
                            ref={map}
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={{ height: 220, width: "100%", borderRadius: 5, overflow: 'hidden' }}
                            region={{
                                latitude,
                                longitude,
                                latitudeDelta: latitudeDelta,
                                longitudeDelta: longitudeDelta,
                            }}
                            >
                                 <Marker
                                    identifier='taker'
                                    title={service?.user.name}
                                    image={flagPinkImg}
                                    key={service?.user.id}
                                    coordinate={{latitude, longitude}}
                                />
                                 <Marker
                                    identifier='provider'
                                    title={userName}
                                    image={flagBlueImg}
                                    key={"provider"}
                                    coordinate={{latitude: latitudeD, longitude: longitudeD }}
                                />
                            </MapView>                     
                        <RegularButton            
                                btnStyles={{backgroundColor: primaryColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 15}}
                                textStyles={{color: secondColor, fontSize: 24, fontWeight: '500'}}
                                onPress={() => {}}>
                                Rota
                        </RegularButton></>
                    }
                    </ModalView>
                   } 
                </ModalPressableContainer>
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
};  

export default ScheduleDatailsProvider;