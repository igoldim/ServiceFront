import { StyleProp, ViewStyle } from "react-native";
import { TAgenda, TComment, TSearch, TServices, TUser, TUsers } from "../types/AppType";

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
    UserType: string;
    userId: string;
    Name: string;
    Email: string;
    Avatar: string;
    Latitude: string;
    Longitude: string;
    ActivateCode: string;
}


export interface TransactionSectionProps {
    data: Array<TServices> | undefined;
    title: string;
    subtitle: string;
    primaryColor: string;
    secondColor: string;    
}

export interface TransactionSectionFakeProps {
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

export interface ILogin {
    appId: string;
    email: string;
    password: string;
}

export interface IRegister {
    appId: string;
    name: string;
    email: string;
    register: string;
    password: string;
    latitude: string,
    longitude: string
    tipo: number,
}



export interface TLoadData {
    id: string;
    appid: string;
}

export interface ILogin {
    appId: string;
    email: string;
    password: string;
}

export interface ILoginResult {
    sucessful: boolean,
    sendDocuments: boolean,
	data: TUser,
	token: string;
	type: string;
    userType: number,
    message: string;
}

export interface ICepResult {
    cep: string,
    logradouro: string,
	complemento: string,
	bairro: string;
	localidade: string;
    uf: string,
    ddd: string;
    erro: string;
}

export interface IEndereco {
    userId: string,
    zip: string,
    address: string,
    number: string,
    complement: string, 
    district: string,
    city: string,
    state: string,
    latitude?: string,
    longitude?: string
}


export interface IChangePassword {
    userId: string;
	password: string;
}

export interface IDefaultResult {
    sucessful: string,
    message: string,
}
export interface IRegisterResult {
    sucessful: boolean,
	data: TUser,
    message: string;
}

export interface IEmailValidation {
    email: string;
	token: string;
}


