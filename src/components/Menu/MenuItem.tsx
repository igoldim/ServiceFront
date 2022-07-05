import { useNavigation } from "@react-navigation/native";
import React from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from "styled-components/native";
import SmallText from "../Texts/SmallText";

const MenuITemView = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 40px;
    margin-bottom: 30px;
    padding: 4px;
`;


type MenuItemProps = {
    title: string;
    icon: string;
    primaryColor: string;
    secondColor: string;
    onPress?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({onPress, title, icon, primaryColor, secondColor}) => {
    const navigation = useNavigation();

    return(
        <MenuITemView 
            onPress={onPress}>
                <Icon name={icon}  size={30} color={secondColor} />
                <SmallText textStyles={{color: secondColor, fontSize: 24, fontWeight: '600', marginLeft: 22}} >{title}</SmallText>
        </MenuITemView>
    )
}

export default MenuItem;
