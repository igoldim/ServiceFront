import React from "react";
import RegularButton from "../../../components/Buttons/RegularButton";
import ScreenHead from "../../../components/Head/ScreenHead";
import MaskedInput from "../../../components/Input/MaskedInput";
import { Masks } from 'react-native-mask-input'
import StyledList from "../../../components/Lists/StyledList";
import { Container } from "../../../components/Shared";
import { useAppData } from "../../../services";
import { TAgenda, ScreensProps } from "../../../types/AppType";
import MessageAlertModal from "../../../components/Modals/MessageAlertModal";
import { ActivityIndicator, Alert } from "react-native";
import { fetchAtualizar, fetchDeletar, fetchIncluir, fetchLoad } from "../services";
import { createIconSetFromFontello } from "react-native-vector-icons";

const Agenda: React.FC<ScreensProps> = ({navigation}) =>{
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    const [visible, setVisible] = React.useState(false);
    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [messageModal, setMessageModal] = React.useState('');
    const [type, setType] = React.useState("erro");
    const [isLoading, setLoading] = React.useState(false);
    const [isLoadingData, setIsLoadingData] = React.useState(false);
    

    const [dataScheduling, setDataScheduling] = React.useState("");
    const [timeScheduling, setTimeScheduling] = React.useState("");
    const [amountScheduling, setAmountScheduling] = React.useState("");
    const [agendaData, setAgendaData]  = React.useState<Array<TAgenda> | null>(null);
    const [agenda, setAgenda]  = React.useState<TAgenda | null>(null);

    React.useEffect(() =>{
        loadData();
    },[]);

    const loadData = async () => {
        setIsLoadingData(true);
        const {primaryColor:strPrimaryColor, secondColor: strSecondColor, userId, appKey: appId } = await useAppData();

        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 

        const {sucessful, data, message} = await fetchLoad({userId, appId});
        
        if (sucessful){
            setAgendaData(data);
        }

        setIsLoadingData(false);
    };
    

    const handleNew = () => {
        setAgenda(null);
        setDataScheduling("");
        setTimeScheduling("");
        setAmountScheduling("");
    }

    const handleGravar = async () => {
        setLoading(true);
        if (dataScheduling === "") {
            setLoading(false);
            showModal("Data da agenda", "o campo data é obrigatório.", "erro");
            return false;
        }

        if (dataScheduling.length < 10) {
            setLoading(false);
            showModal("Data da agenda", "Informe a data corretamente.", "erro");
            return false;
        }


        if (timeScheduling === "") {
            setLoading(false);
            showModal("Hora da agenda", "o campo hora é obrigatório.", "erro");
            return false;
        }

        if (timeScheduling.length < 5) {
            setLoading(false);
            showModal("Hora da agenda", "Informe a hora corretamente.", "erro");
            return false;
        }


        if (amountScheduling === "") {
            setLoading(false);
            showModal("Valor da agenda", "o valor do serviço é obrigatório.", "erro");
            return false;
        }

        const { userId, appKey: appId } = await useAppData();
        if (!agenda){
            var scheduleDateTime = `${dataScheduling} ${timeScheduling}`;
            const {sucessful, message} = await fetchIncluir({userId, appId, scheduleDateTime, amount: amountScheduling});

            if (sucessful){
                loadData();
                showModal("Parabéns", message, "success");
            }
            else{
                showModal("Erro", message, "erro");
            }
        }
        else{
            var scheduleDateTime = `${dataScheduling} ${timeScheduling}`;
            const {sucessful, message} = await fetchAtualizar({id: agenda.id, userId, appId, scheduleDateTime, amount: amountScheduling});

            if (sucessful){
                loadData();
                showModal("Parabéns", message, "success");
            }
            else{
                showModal("Erro ao atualizar", message, "erro");
            }
        }

        handleNew();
        setLoading(false);
    }

    const modalButtonHandle = () =>{
        setVisible(false);
    }

    const showModal = (headText: string, message: string, type: string)=> {
        setMessageHeadding(headText);
        setMessageModal(message);
        setType(type);
        setVisible(true);
    }

    const handleEdit = (item: TAgenda) => {
        return Alert.alert(
        "Editar Agenda?",
        "Deseja realmente editar está agenda?",
        [
            // The "Yes" button
            {
            text: "Sim",
            onPress: () => {
                setAgenda(item);
                setDataScheduling(item.scheduleDateTime.split('T')[0]);
                setTimeScheduling(item.scheduleDateTime.split('T')[1]);
                setAmountScheduling(item.amount);
            },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
            text: "Não",
            },
        ]
        );
    };

    const handleDelete = (item: TAgenda) => {
        return Alert.alert(
        "Excluir Agenda?",
        "Deseja realmente excluir está agenda?",
        [
            // The "Yes" button
            {
                text: "Sim",
                onPress: async () => {
                    const { userId, appKey: appId } = await useAppData();
                    const {sucessful, message} = await fetchDeletar({id: item.id, userId, appId});

                    if (sucessful){
                        loadData();
                        showModal("Parabéns", message, "success");
                    }
                    else{
                        showModal("Erro ao excluir", message, "erro");
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
    };

    return (
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                screenName="Agenda"  
                onPress={() => navigation.navigate("Menu")}
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true}
                showRightIcon={true} 
                RightIconName="clock-plus-outline" 
                onRightPress={handleNew}/>


            <MaskedInput 
                iconeName='calendar'
                iconeColor={primaryColor}
                title='Data'
                placeholder="00/00/0000"
                maxLength={10}
                keyboardType="number-pad"
                mask={Masks.DATE_DDMMYYYY}          
                value={dataScheduling}
                onChangeText={setDataScheduling}
                placeholderColor={primaryColor}
                titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 20, fontWeight: '600', width:'85%'}}
                ViewStyles={{backgroundColor: secondColor, marginTop: 10}}
                iconStyles={{borderColor: primaryColor}}    
            />
            <MaskedInput 
                iconeName='clock'
                iconeColor={primaryColor}
                title='Hora'
                placeholder="00:00"
                keyboardType="number-pad"
                mask={Masks.SHORT_TIME}  
                maxLength={5}
                value={timeScheduling}
                onChangeText={setTimeScheduling}
                placeholderColor={primaryColor}
                titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 20, fontWeight: '600', width:'85%'}}
                ViewStyles={{backgroundColor: secondColor, marginTop: 10}}
                iconStyles={{borderColor: primaryColor}}    
            />

            <MaskedInput 
                iconeName='currency-usd'
                iconeColor={primaryColor}
                title='Valor'
                placeholder="0,00"
                keyboardType="number-pad"
                mask={Masks.CURRENCY_BRL}  
                value={amountScheduling}
                onChangeText={setAmountScheduling}
                placeholderColor={primaryColor}
                titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 20, fontWeight: '600', width:'85%'}}
                ViewStyles={{backgroundColor: secondColor, marginTop: 10}}

                iconStyles={{borderColor: primaryColor}}
            />

            {isLoading && <RegularButton 
                        btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 15}}
                        textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                        disabled={true}>
                            <ActivityIndicator size={30} color="#fff" />
                        </RegularButton>}
                
            {!isLoading &&
            <RegularButton            
                    btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 15}}
                    textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                    onPress={handleGravar}>
                    Gravar
            </RegularButton>}

            <StyledList 
                refreshing={isLoadingData} 
                onRefresh={loadData} 
                style={{marginTop: 15}}
                data={agendaData as Array<TAgenda>} 
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                onPressEdit={handleEdit}
                onPressDelete={handleDelete}
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

export default Agenda;