import { StyleProp, ViewStyle } from "react-native";
import { TAgenda, TComment, TSearch, TUsers } from "../types/AppType";

export interface IApp {
    slug: string;
    applicationkey: string;
}

export interface ServicesSectionProps {
    data: Array<TUsers>;
}

export interface FavoritesSectionProps {
    data: Array<TUsers>;
}

export type IResultApp = {
    id: string;
    slug: string;
    titulo: string;
    subtitulo: string;
    logo: string;
    primaryColor: string;
    secondColor: string;
    versao: string;
    termoCompromisso: string;
    politicaPrivacidade: string;
    applicationkey: string;
    createAt: string;
    updateAt: string;
}

export interface IContextApp {
    appKey: string;
    titulo: string;
    logo: string;
    subtitulo: string;
    primaryColor: string;
    secondColor: string;
    versao: string;
    userType: string;
}


export interface TransactionSectionProps {
    data: Array<TUsers>;
    title: string;
    subtitle: string;
    primaryColor: string;
    secondColor: string;    
}

export interface TransactionAviProps {
    icon?: string | undefined;
    texto?: string | undefined;
    primaryColor: string;
    secondColor: string;  
}


export interface AgendaProps {
    style?: StyleProp<ViewStyle>;
    data: Array<TAgenda>; 
    primaryColor: string;
    secondColor: string;
    onPressEdit: (value: string) => void;
    onPressDelete: (value: string) => void;
}

export interface AgendarProps {
    style?: StyleProp<ViewStyle>;
    data: Array<TAgenda>; 
    primaryColor: string;
    secondColor: string;
    onPress: () => void;
}

export interface AgendaItemProps {
    id: string;
    scheduleDate: string;
    scheduleTime: string;
    status: string;
    amount: string;
    primaryColor: string;
    secondColor: string;  
    onPressEdit: (value: string) => void;
    onPressDelete: (value: string) => void;
}

export interface AgendarItemProps {
    id: string;
    scheduleDate: string;
    scheduleTime: string;
    status: string;
    amount: string;
    primaryColor: string;
    secondColor: string;  
    onPress: () => void;
}

export interface SearchListProps {
    style?: StyleProp<ViewStyle>;
    data: Array<TSearch>; 
    primaryColor: string;
    secondColor: string;
    onPress: () => void;
}

export interface CommentProps {
    style?: StyleProp<ViewStyle>;
    data: Array<TComment>; 
    primaryColor: string;
    secondColor: string;
}

export interface SearchListItemProps {
    id: string;
    name: string;
    avatar: string;
    amount: string;
    stars: number;
    distance: number;
    primaryColor: string;
    secondColor: string;  
    onPress: () => void;
}

export interface CommentItemProps {
    id: string,
    name: string;
    avatar: string,
    amount: string,
    stars: number,
    comment: string,
    primaryColor: string;
    secondColor: string;  
}

