import { StyleProp, ViewStyle } from "react-native";
import { TAgenda, TComment, TPayments, TSchedule, TschedulingData, TSearch, TServices, TUser, TUsers } from "../types/AppType";

export interface IApp {
    slug: string;
    applicationkey: string;
}

export interface ServicesSectionProps {
    data: Array<TUsers>;
    onRefresh?: () => void; 
    refreshing?: boolean;
    primaryColor: string;
    secondColor: string;  
}
export interface PaymentsProps {
    data: Array<TPayments>;
    primaryColor: string;
    secondColor: string;
    onRefresh?: () => void; 
    refreshing?: boolean;
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
    IsLogado: string;
}


export interface TransactionSectionProps {
    data: Array<TServices> | undefined;
    title: string;
    subtitle: string;
    primaryColor: string;
    secondColor: string;    
    onRefresh?: () => void; 
    refreshing?: boolean;
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
    onPressEdit: (value: TAgenda) => void;
    onPressDelete: (value: TAgenda) => void;
    onRefresh?: () => void; 
    refreshing?: boolean;   
}

export interface AgendarProps {
    style?: StyleProp<ViewStyle>;
    data: Array<TAgenda>; 
    primaryColor: string;
    secondColor: string;
    onPress: () => void;
    onRefresh?: () => void; 
    refreshing?: boolean;    
}

export interface ScheduleProps {
    style?: StyleProp<ViewStyle>;
    data: Array<TSchedule>; 
    primaryColor: string;
    secondColor: string;
    onPress: () => void;
    onRefresh?: () => void; 
    refreshing?: boolean;    
}

export interface AgendaItemProps {
    id: string,
    userId: string,
    appId: string,
    scheduleDateTime: string,
    amount: string,
    status: number,
    createAt: string,
    updateAt?: string | null,
    primaryColor: string,
    secondColor: string, 
    onPressEdit: (value: TAgenda) => void,
    onPressDelete: (value: TAgenda) => void
}

export interface AgendarItemProps {
    id: string,
    userId: string,
    appId: string,
    scheduleDateTime: string,
    amount: string,
    status: number,
    createAt: string,
    updateAt?: string | null
    primaryColor: string;
    secondColor: string;  
    onPress: () => void;
}

export interface SearchListProps {
    style?: StyleProp<ViewStyle>;
    data: Array<TSearch>; 
    primaryColor: string;
    secondColor: string;
    onPress: (item : TUsers) => void;
    onRefresh?: () => void; 
    refreshing?: boolean;
}

export interface CommentProps {
    style?: StyleProp<ViewStyle>;
    data: Array<TComment>; 
    primaryColor: string;
    secondColor: string;
    onRefresh?: () => void; 
    refreshing?: boolean;
}

export interface SearchListItemProps {
    id: string;
    name: string;
    avatar: string;
    amount: string;
    stars: number;
    distance: string;
    primaryColor: string;
    secondColor: string;  
    onPress: (item : TUsers) => void;
}

export interface CommentItemProps {
    id: string,
    serviceId: string,
    appId: string,
    commentary: string,
    stars: number,
    service: TServices,
    createAt: string,
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

export interface IDefaultUserGet {
    userId: string,
    appId: string
}

export interface ISelectedUser {
    id: string,
    userId: string,
    appId: string,
    latitude: string,
    longitude: string,
    distance: number
}


export interface ISetFavorite {
    userId: string,
    profissionalId: string,
    appId: string,
    favorite: boolean
}

export interface ISerach {
    userId: string,
    appId: string,
    query: string,
    latitude: string,
    longitude: string,
    distance: number
}
export interface IScheduleDelete {
    userId: string,
    appId: string
    id: string;
}

export interface ILoginResult {
    sucessful: boolean,
    sendDocuments: boolean,
	data: TUser,
	token: string;
	type: string;
    userType: number,
    message: string;
    status: any;
}

export interface IUserResult {
    sucessful: boolean,
	data: TUser,
    message: string;
    status: any;
}

export interface IScheduleResult {
    sucessful: boolean,
	data: Array<TServices>,
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
    sucessful: boolean,
	data?: any,
    message: string;
    status?: any;
}
export interface IRegisterResult {
    sucessful: boolean,
	data: TUser,
    message: string;
    status: any;
}

export interface IAgendaResult {
    sucessful: boolean,
	data: Array<TAgenda>,
    message: string;
    status: any;
}


export type TSearchResult = {
    sucessful: boolean,
	data: Array<TSearch>,
    message: string,
    status: any,
}


export interface IRecargaResult {
    sucessful: boolean,
	data: TPayments,
    message: string;
    status: any;
}

export interface IPaymentsResult {
    sucessful: boolean,
	data: Array<TPayments>,
    message: string;
    status: any;
}

export interface IEmailValidation {
    email: string;
	token: string;
}


export interface IAgendaRegister {
    userId: string,
    appId: string,
    scheduleDateTime: string,
    amount: string,
}


export interface IRecargaRegister {
    userId: string,
    appId: string,
    valor: string,
}

export interface IPaymentSearch {
    id: string,
}

export interface IAgendaUpdate {
    id: string,
    userId: string,
    appId: string,
    scheduleDateTime: string,
    amount: string,
}