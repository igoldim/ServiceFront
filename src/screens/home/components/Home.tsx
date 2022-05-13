import React from 'react';
import CardSection from '../../../components/Cards/CardSection';
import { HomeContainer, HeaderStyled, TopSection, StyledPressable } from './Home.s';
import { HomeProps } from './Home.t';
import avatar from '../../../assets/images/avatar.png';
import TransactionSection from '../../../components/Transaction/TransactionSection';

import avi from '../../../assets/images/avatar.png'

import { Colors } from '../../../components/Colors';

import AsyncStorage from '@react-native-community/async-storage';
import Greeting from '../../../components/Head/Greeting';
import Profile from '../../../components/Head/Profile';
import BigText from '../../../components/Texts/BigText';
import RegularText from '../../../components/Texts/RegularText';
import Icon from 'react-native-vector-icons/Ionicons';
import { Alert, View } from 'react-native';
import ModalTransaction from '../../../components/Modals/ModalTransaction';
import ModalScheduling, { Users } from '../../../components/Modals/ModalScheduling';

const Home: React.FC<HomeProps> = ({navigation}) => {
    const [name, setName] = React.useState("Igor");
    
    const [visible, setVisible] = React.useState(false);
    const [messageModal, setMessageModal] = React.useState(''); //Email Validado com sucesso!
    const [messageType, setMessageType] = React.useState('');
    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [modalButtonText, setmodalButtonText] = React.useState('');     


    React.useEffect(()=>{
        const handleUserName = async () => {
            const userName = await AsyncStorage.getItem("Name");
            setName(userName!.toString());
            const res = await AsyncStorage.getItem('isLogged');
            if (res === "true") {
                navigation.navigate("Home");
            }
            else{
                navigation.navigate("Welcome");
            }       
        };    
        handleUserName();
        return () => { setName(""); }
    }, []);


    const handlePerfil = async () => {
        await AsyncStorage.setItem("Name", "");
        await AsyncStorage.setItem("token", "");
        await AsyncStorage.setItem("isLogged", "false");
        navigation.navigate('Welcome');
        return true;
    }

   

    const cardData : Array<Users> = [
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af097",
            userName: "Igor Goldim",
            userAddress: "Rua Gabriel Junqueira, 00",
            userAddressDistrict: "Serra Dourada 3 Etapa",
            userAddressCity: "Aparecida de Goiania",
            userAddressState: "GO",
            userAddressComplement: "QD 55 LT 22 Casa 01",
            scheduleDate: "07/05/2022", // ==> pegar dia da semana (Sabádo)
            scheduleTime: "08:00",
            amount: "100,00",
            userImage: avatar
        },
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af080",
            userName: "Augusto Oliveria",
            userAddress: "Rua A, 00",
            userAddressDistrict: "Etapa da Serra",
            userAddressCity: "Desaparecida de Goiania",
            userAddressState: "GO",
            userAddressComplement: "QD 01 LT 55 Casa 22",
            scheduleDate: "08/05/2022", // ==> pegar dia da semana (Domingo)
            scheduleTime: "07:00",
            amount: "100,00",
            userImage: avatar
        },
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af001",
            userName: "Amanda Reys",
            userAddress: "Rua Sem Nome, 99",
            userAddressDistrict: "Dourada Serra",
            userAddressCity: "Goiania de Aparecida",
            userAddressState: "GO",
            userAddressComplement: "QD 22 LT 55 Casa 02",
            scheduleDate: "09/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "08:00",
            amount: "100,00",
            userImage: avatar
        },
    ];

    const cardService = [
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af097",
            userName: "Amanda Reys",
            scheduleDate: "08/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "08:00",
            amount: "100,00",
            art: {
                icon: "checkbox",
                background: Colors.Salmon
            },
        },
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85ad2541",
            userName: "Augusto Oliveria",
            scheduleDate: "07/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "07:00",
            amount: "100,00",
            art: {
                icon: "checkbox",
                background: Colors.Salmon
            },
        },
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af854",
            userName: "Igor Goldim",
            scheduleDate: "06/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "08:00",
            amount: "100,00",
            art: {
                icon: "checkbox",
                background: Colors.Salmon
            },
        },       
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af0127",
            userName: "Suly Bastos",
            scheduleDate: "05/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "08:00",
            amount: "100,00",
            art: {
                icon: "checkbox",
                background: Colors.Salmon
            },
        },
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af0122",
            userName: "Calor Trindade",
            scheduleDate: "04/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "08:00",
            amount: "100,00",
            art: {
                icon: "checkbox",
                background: Colors.Salmon
            },
        },
        {
            id: "3cb32ade-ac5d-40b5-bf25-b135c85af0122",
            userName: "Trindade Jr",
            scheduleDate: "03/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "07:30",
            amount: "100,00",
            art: {
                icon: "checkbox",
                background: Colors.Salmon
            },
        },
        {
            id: "4cb32ade-ac5d-40b5-bf25-b135c85af0122",
            userName: "Maria José",
            scheduleDate: "02/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "07:00",
            amount: "100,00",
            art: {
                icon: "checkbox",
                background: Colors.Salmon
            },
        },   
     ];

     const showModal = (type: string, message: string, headText: string, buttonLabel: string) => {
        setMessageType(type);
        setMessageModal(message);
        setMessageHeadding(headText);
        setmodalButtonText(buttonLabel);
        setVisible(true);
    }


    const modalButtonHandle = () =>{
        setVisible(false);
    }

    const modalButtonHandleScheduling = () =>{
        setVisible(false);
    }

   

    return (
        <> 
            <HeaderStyled>
                <Greeting 
                    mainText={"Olá, " + name.split(' ')[0]}
                    subtext='Que bom ter você de volta!' />
                <Profile 
                        img={avi} 
                        imageContainerStyle={{backgroundColor: Colors.Gray}}
                        onPress={async () => handlePerfil()}
                />
            </HeaderStyled>        
            <HomeContainer>
                <TopSection>
                    <BigText textStyles={{fontWeight: 'bold'}}>Saldo</BigText>
                    <StyledPressable onPress={() => {showModal('','R$ 595,00','Saldo','')}}><Icon name="arrow-forward" color={Colors.White} size={25} /></StyledPressable>
                </TopSection>
                <View style={{width: '100%', paddingLeft: 25}}>
                    <BigText >R$ 595,00</BigText>
                </View>
               <CardSection data={cardData} onPress={({item}:any) => showModalScheduling(item)} />
               <TransactionSection data={cardService} title={"Serviços"} subtitle={"Recentes"}/>
            </HomeContainer>
            <ModalTransaction 
                visible={visible} 
                setVisible={setVisible} 
                heading={messageHeadding} 
                message={messageModal} 
                btnTitle={modalButtonText} 
                type={messageType}
                onPress={modalButtonHandle}
                onPressTransaction={() => alert('Aguarde, estamos transferindo seu saldo para sua conta cadastrada. Prazo de 72h para conclusáo')}
                />
        </>
    );
};  

export default Home;