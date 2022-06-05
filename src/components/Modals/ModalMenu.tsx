import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components/native';
import { Colors } from '../Colors';
import RegularText from '../Texts/RegularText';
import { GestureResponderEvent, ImageSourcePropType, Modal, StyleProp, TextStyle, ViewStyle } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

import RegularButton from '../Buttons/RegularButton';
import { Row } from '../Shared';
import AsyncStorage from '@react-native-community/async-storage';

import { useNavigation } from '@react-navigation/native';
import SmallText from '../Texts/SmallText';


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

const MenuItemView = styled.TouchableOpacity`
    align-items: center;
    background-color: ${Colors.Salmon};
    width: 100%;
    padding: 10px;
    height: 50px;
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

export const StyleRow = styled(Row)`
    border-bottom: 1px #fff solid;
    border-radius: 10px;
    margin: 10px;
    padding: 2px;
`;

export const StyledImage = styled.Image`
    resize-mode: cover;
    width: 100%;
    height: 100%;
    border-radius: 10px;    
`;

interface MenuProps{
    item? : Users | undefined;
    btnStyles?: StyleProp<ViewStyle>;
    onPress?: ((event:GestureResponderEvent) => void | undefined);
    textStyles?: StyleProp<TextStyle>;
    children?: React.ReactNode;
    visible?: boolean | undefined;
    heading?: string | undefined;
    message?: string | undefined;
}

export type Users =  {
    id: string,
    userName: string,
    userAddress: string,
    userAddressDistrict: string,
    userAddressCity: string,
    userAddressState: string,
    userAddressComplement: string,
    scheduleDate: string,
    scheduleTime: string,
    amount: string,
    userImage: ImageSourcePropType,
    stars: number, 
}

const ModalMenu: React.FC<MenuProps> = (props) => {

    const navigation = useNavigation();
    const [versao, setVersao] = React.useState("0.0.000");

    React.useEffect(()=>{
        const handleUserName = async () => {
            const strVersao = await AsyncStorage.getItem("versao");
            setVersao( strVersao ? strVersao : versao);
        };
        handleUserName();
        return () => {}
    }, []);



    const handleSair = async () =>{
        await AsyncStorage.setItem("Name", "");
        await AsyncStorage.setItem("token", "");
        await AsyncStorage.setItem("isLogged", "false");
        navigation.navigate("Welcome");

    }
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
                    <StyleRow>
                        <MenuItemView style={{backgroundColor: Colors.Salmon}} onPress={() => {}}>
                            <RegularText>PEFIL</RegularText>
                        </MenuItemView>
                    </StyleRow>
                    <StyleRow>
                        <MenuItemView style={{backgroundColor: Colors.Salmon}} onPress={() => {}}>
                            <RegularText>AGENDAMENTOS</RegularText>
                        </MenuItemView>
                    </StyleRow>
                    <StyleRow>
                        <MenuItemView style={{backgroundColor: Colors.Salmon}} onPress={() => {}}>
                            <RegularText>TRANSAÇÕES</RegularText>
                        </MenuItemView>
                    </StyleRow>
                    <StyleRow>
                        <MenuItemView style={{backgroundColor: Colors.Salmon}} onPress={() => {}}>
                            <RegularText>CONFIGURAÇÕES</RegularText>
                        </MenuItemView>
                    </StyleRow>
                    <StyleRow>
                        <MenuItemView style={{backgroundColor: Colors.Salmon}} onPress={() => handleSair()}>
                            <RegularText>SAIR</RegularText>
                        </MenuItemView>
                    </StyleRow>
                    <SmallText textStyles={{color:Colors.White, textAlign:'center'}} >Versão {versao}</SmallText>
                </ModalView>
            </ModalPressableContainer>
            {props.children}
        </Modal>
    );
};

export default ModalMenu;