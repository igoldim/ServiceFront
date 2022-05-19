import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components/native';
import { Colors } from '../Colors';
import BigText from '../Texts/BigText';
import RegularText from '../Texts/RegularText';
import { GestureResponderEvent, Modal, StyleProp, TextStyle, ViewStyle } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

import RegularButton from '../Buttons/RegularButton';
import TransactionSection from '../Transaction/TransactionSection';

const ModalPressableContainer = styled.Pressable`
    flex: 1;
    padding: 1px;
    background-color: rgba(0, 0, 0, 0.7);
    justify-content: center;
    align-items: center;
`;


const ModalClose = styled.Pressable``;

const ModalView = styled.View`
    background-color: ${Colors.Background};
    border-radius: 10px;
    width: 96%;
    height: 98%;
    padding: 5px;
    align-items: center;
    /*elavation: 5;
    shadow-color: ${Colors.Black};
    shadown-offset: 0px 2px;
    shadownOpacity: 0.25;
    shadown-radius: 4px;*/
`;


const ModalHead = styled.View`
    flex-direction: row;
    justify-content: space-between;
    background-color: ${Colors.Background};
    width: 100%;
    height: 60px;
    padding: 10px;
    align-items: center;
`;

interface ButtonProps{
    btnStyles?: StyleProp<ViewStyle>;
    onPress?: ((event:GestureResponderEvent) => void | undefined);
    textStyles?: StyleProp<TextStyle>;
    children?: React.ReactNode;
    visible?:boolean | undefined;
    type: string;
    heading: string;
    message: string;
    btnTitle: string;
    onPressTransaction?: ((event:GestureResponderEvent) => void | undefined);
}




const ModalTransaction: React.FC<ButtonProps> = (props) => {

    const cardService = [
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af097",
            userName: "Entrada",
            scheduleDate: "17/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "Pix",
            amount: "30,00",
            art: {
                icon: "logo-bitcoin",
                background: Colors.Green
            },
        },
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85ad2541",
            userName: "Saida",
            scheduleDate: "16/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "Tx",
            amount: "-15,00",
            art: {
                icon: "logo-bitcoin",
                background: Colors.Green
            },
        },
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af854",
            userName: "Saída",
            scheduleDate: "15/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "Tx",
            amount: "-15,00",
            art: {
                icon: "logo-bitcoin",
                background: Colors.Green
            },
        },       
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af0127",
            userName: "Entrda",
            scheduleDate: "15/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "Crédito",
            amount: "45,00",
            art: {
                icon: "logo-bitcoin",
                background: Colors.Green
            },
        },
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af0122",
            userName: "Saída",
            scheduleDate: "14/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "Tx",
            amount: "-15,00",
            art: {
                icon: "logo-bitcoin",
                background: Colors.Green
            },
        },
        {
            id: "3cb32ade-ac5d-40b5-bf25-b135c85af0122",
            userName: "Trindade Jr",
            scheduleDate: "13/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "Tx",
            amount: "-15,00",
            art: {
                icon: "logo-bitcoin",
                background: Colors.Green
            },
        },
        {
            id: "4cb32ade-ac5d-40b5-bf25-b135c85af0122",
            userName: "Entrada",
            scheduleDate: "12/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "Pix",
            amount: "30,00",
            art: {
                icon: "logo-bitcoin",
                background: Colors.Green
            },
        },   
     ];


    return(
        <Modal
            animationType='slide'
            visible={props.visible!}>
            <ModalPressableContainer>
                <ModalView>
                    <ModalHead>
                        <ModalClose onPress={props.onPress}>
                            <Icon 
                                name='arrow-back' 
                                color={Colors.White} size={25}
                                />
                        </ModalClose>
                    </ModalHead>
                        <BigText textStyles={{fontSize: 25, color: Colors.White, marginVertical:10, fontWeight: 'bold'}} >{props.heading}</BigText>
                        <RegularText>{props.message}</RegularText>
                        <RegularButton btnStyles={{marginTop: 25, marginBottom: 25, width: '80%', backgroundColor: Colors.Salmon}} onPress={props.onPressTransaction}>Adicionar Saldo</RegularButton>
                        <TransactionSection data={cardService}  title={"Extrato"} subtitle={"Valores/Tx"}/>
                </ModalView>

            </ModalPressableContainer>
            {props.children}
        </Modal>
    );
};  

export default ModalTransaction;