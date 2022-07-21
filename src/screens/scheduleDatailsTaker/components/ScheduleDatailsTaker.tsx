import React from 'react';
import ScreenHead from '../../../components/Head/ScreenHead';
import { Container, Row } from '../../../components/Shared';
import { cleanData, useAppData } from '../../../services';
import { Alert, StatusBar } from "react-native";
import RegularButton from '../../../components/Buttons/RegularButton';
import BigText from '../../../components/Texts/BigText';
import RegularText from '../../../components/Texts/RegularText';
import RegularInputArea from '../../../components/Input/RegularInputArea';
import { fetchCancelAgendamento, fetchGetAgendamento, fetchUpgendamento } from '../../takerDashboard/service';
import Stars from '../../../components/Stars';
import { useNavigation } from '@react-navigation/native';
import { ScreensProps, TServices } from '../../../types/AppType';
import { ModalPressableContainer, ModalView, StyledImage } from './ScheduleDatailsTaker.s';
import AsyncStorage from '@react-native-community/async-storage';
import MessageAlertModal from '../../../components/Modals/MessageAlertModal';


const ScheduleDatailsTaker: React.FC<ScreensProps> = (props)  => {
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    const [service, setService ] = React.useState<TServices | null>(null);
    const [commentary, setCommentary] = React.useState('');     
    const [status, setStatus] = React.useState('');     
    const [startValue, setStarValue] = React.useState(0);

    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [messageModal, setMessageModal] = React.useState('');
    const [type, setType] = React.useState("erro");
    const [visible, setVisible] = React.useState(false);
    const [temConnection, setTemConnection] = React.useState(false);

    const [isLoading, setLoading] = React.useState(false);


    const navigation = useNavigation();

    React.useEffect(() =>{
      loadData();
    },[]);

    const loadData = async () => {
        const {primaryColor:strPrimaryColor, secondColor: strSecondColor, userId, appKey: appId } = await useAppData();
        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 

        //carrega dados da api
        const serviceId = await AsyncStorage.getItem("serviceId") as string;

        var reponse = await fetchGetAgendamento({id: serviceId,  userId,  appId}); 
        if (reponse){
            setTemConnection(true);
            const {sucessful, data, message} = reponse;
            if (sucessful){
                setService(data);       
                setLoading(false);
            }
        }
        else{
            //setTemConnection(false);
            setLoading(false);
            showModal("Segurança", "suas credênciais expiraram, precisamos que você efetue novamente seu login.", "erro");
            //cleanData();
        }
        //console.log(serviceId);
    };

    const showModal = (headText: string, message: string, type: string)=> {
        setMessageHeadding(headText);
        setMessageModal(message);
        setType(type);
        setVisible(true);
    }

    const handleSetStarValue = (value : number) => {

    };


    const modalButtonHandle = async () =>{
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
            showModal("erro", "não se pode inciar atendimento antes da data agendada.", "Data de Agendmaneto", "Fechar");
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
                            setStatus("Concluído");
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
                        setStatus("Concluído");
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
                                    setStatus("Cancelado");                                   
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

    const handleSetSatrValue = (newValue : number) =>{
        setStarValue(startValue !== newValue ? newValue : 0);
    };

    const handleComment = () => {
    }

    const handleBack = async () => {
        const {UserType} = await useAppData();
        navigation.reset({
            index: 1,
            routes: [
            { name:  UserType === '0' ? "TakerDashboard" : "ProviderDashboard" },
            ],
        });
    }

    return (
          <Container style={{backgroundColor: primaryColor}}>
            <ModalPressableContainer style={{backgroundColor: primaryColor}}>
                    <ModalView style={{backgroundColor: secondColor}}>
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
                            <BigText textStyles={{textAlign: 'left', fontSize: 20, color: primaryColor, marginVertical: 2, fontWeight: 'bold'}} >Cliente</BigText>
                            <BigText textStyles={{textAlign: 'left', fontSize: 20, color: primaryColor, marginVertical: 2, fontWeight: 'bold'}} >Valor</BigText>
                        </Row>
                        {service?.proffisional && 
                            <Row style={{width: '100%'}}>
                                <RegularText textStyles={{fontSize: 16, color: primaryColor}} >{service?.proffisional.name.split(' ')[0] + ' ' + service?.proffisional.name.split(' ')[service?.proffisional.name.split(' ').length-1]}</RegularText>
                                <RegularText textStyles={{fontSize: 16, color: primaryColor}} >{service?.amountValue && service?.amountValue}</RegularText>
                            </Row>
                        }
                        <Row style={{width: '100%'}}>
                            <BigText textStyles={{fontSize: 20, color: primaryColor, marginVertical: 2, fontWeight: 'bold'}} >Endereço</BigText>
                        </Row>
                        {service?.proffisional && 
                        <Row style={{width: '100%'}}>
                            <BigText textStyles={{fontSize: 16, color: primaryColor}} >{service?.proffisional.address}{service?.proffisional.number && ', ' + service?.proffisional.number}</BigText>
                        </Row>
                        }
                        {service?.proffisional && 
                        <Row style={{width: '100%'}}>
                            <BigText textStyles={{fontSize: 16, color: primaryColor}} >{service?.proffisional.district}</BigText>
                        </Row>
                        }
                        {service?.proffisional?.complement != null && 
                        <Row style={{width: '100%'}}>
                            <BigText textStyles={{fontSize: 16, color: primaryColor}} >{service?.proffisional.complement}</BigText>
                        </Row>
                        }
                        {service?.proffisional && 
                        <Row style={{width: '100%'}}>
                            <BigText textStyles={{fontSize: 16, color: primaryColor}} >{service?.proffisional.city}{" / " + service?.proffisional.state}</BigText>
                        </Row>
                        }

                        {service?.user  &&
                        <>
                            <Row style={{width: '100%'}}>
                                <BigText textStyles={{fontSize: 20, color: primaryColor, marginVertical: 10, fontWeight: 'bold'}} >Localização</BigText>
                            </Row>
                            <Row style={{width: '100%', backgroundColor: secondColor, height: 185,  borderRadius: 10}}>
                                <StyledImage source={{uri: 'https://imagens.circuit.inf.br/maps.jpeg'}} />
                            </Row>
                            {service?.status === "S" &&  
                            <RegularButton 
                                    btnStyles={{alignSelf: 'center', backgroundColor:  primaryColor, width: '45%', borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center'}}
                                    textStyles={{color: secondColor, fontSize: 24, fontWeight: '500'}}
                                    onPress={() => {}}>
                                        Rota
                            </RegularButton>
                            }
                        </>
                        }

                        {service?.proffisional && service?.status === "E" &&
                        <>
                            <Row style={{width: '100%'}}>
                                <BigText textStyles={{fontSize: 20, color: primaryColor, marginVertical: 10, fontWeight: 'bold'}} >Comentário</BigText>
                            </Row>
                            <RegularInputArea
                                ViewStyles={{borderColor: primaryColor, borderTopWidth: 1,  borderLeftWidth: 1,   borderRadius: 5, borderRightWidth: 1,  borderBottomWidth: 1 ,backgroundColor: secondColor}}
                                inputStyles={{textAlignVertical: 'top', color: primaryColor}}
                                multiline={true}
                                maxLength={50}
                                numberOfLines={4}
                                editable={service?.status === "E"}
                                value={commentary}                                
                                onChangeText={setCommentary}
                            />
                            <Stars isSave={service?.status === "E"} onPress={(e) => handleSetSatrValue(e)}  value={startValue} showNumber={false} width="40" height='40' startStyle={{marginTop: 10, marginBottom: 10, alignSelf: 'center'}} color={primaryColor}/>
                            {service?.status === "E" && 
                                <RegularButton 
                                        btnStyles={{alignSelf: 'center', backgroundColor:  primaryColor, width: '45%', borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center', marginBottom: 20}}
                                        textStyles={{color: secondColor, fontSize: 24, fontWeight: '500'}}
                                        onPress={handleComment}>
                                            Salvar
                                </RegularButton>
                            }
                        </>
                        }
                    </ModalView>
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

export default ScheduleDatailsTaker;