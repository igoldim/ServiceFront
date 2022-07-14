import { StackScreenProps } from "@react-navigation/stack";
import { Dispatch, SetStateAction } from "react";
import { RootStackParamList } from "../components/Navigators/RootStack";

export type ScreensProps = StackScreenProps<RootStackParamList, "Welcome">;

export type MenuProps = {
    primaryColor: string;
    secondColor: string;
};

export type AppType = {
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

export type ResendTimerProps = {
    activeResend: boolean;
    setActiveResend: Dispatch<SetStateAction<boolean>>;
    targetTimeInSeconds?: number;
    resendEmail: (triggerTimer : any) => void;
    resendStatus: string;
    resendingEmail: boolean;
    textColor: string;
}

export type PixTimerProps = {
    targetTimeInSeconds?: number;
    textColor: string;
}

export type TUsers =  {
    id?: string | null,
    order?: number,
    userName?: string | null,
    userAddress?: string | null,
    userAddressDistrict?: string | null,
    userAddressCity?: string | null,
    userAddressState?: string | null,
    userAddressComplement?: string | null,
    scheduleDate?: string | null,
    scheduleTime?: string | null,
    amount?: string | null,
    userImage?: string | null,
    stars?: number | null, 
    type?: string | null, 
    art?: {
        icon?: string | null,
        background?: string | null
    } | null;
    primaryColor?: string;
    secondColor?: string;
    status?: string;
}

export type TschedulingData = {
    id: string,
    order: number,
    userName: string,
    scheduleDate: string,
    scheduleTime: string,
    status: string,
    amount: string,
    tax?: string

}

export type TFavoriteData = {
    id: string,
    userId: string,
    appId: string,
    professionalId: string,
    createAt: string,
    updateAt: string,
    professional: TUser,
    user: TUser,
    scheduleDateTime: string,
    rateValue: string,
    amountValue: string
}

export type TAgenda = {
    id: string,
    userId: string,
    appId: string,
    scheduleDateTime: string,
    amount: string,
    status: number,
    createAt: string,
    updateAt?: string | null
}

export type TSearch = {
    id: string,
    name: string;
    avatar: string,
    amount: string,
    stars: number,
    distance: number
}

export type TComment = {
    id: string,
    name: string;
    avatar: string,
    amount: string,
    stars: number,
    comment: string
}

export type TUser = {
    id:  string,
	register: string | null,
	avatarFile: any | null | undefined,
	avatar: string | null, 
	name: string,
	phone: string | null,
	email: string | null,
	zip: string | null,
	address: string | null,
	number: string | null,
	complement: string | null,
	district: string | null,
	city: string | null,
	state: string | null,
	password: string | null,
	activateCode: string | null,
	amount: string | null ,
	serviceAmount: string | null,
	userType: number | null,
	latitude: string | null,
	longitude: string | null,
	status: boolean,
	createAt: string | null,
	updateAt: string | null,
	cards: Array<TCards>,
	documents: Array<TDcuments>,
	favoriteProfessionals: Array<TFavoriteProfessionals>,
	favoriteUsers: Array<TFavoriteUsers>,
	payments: Array<TPayments>,
	schedules: Array<TSchedule>,
	servicesAgendados: Array<TServices>
	servicesConcluido: Array<TServices>
}

export type TUserPerfil = {
    userId : string,
	avatarFile: string | null,
	avatar: string | null, 
	name: string,
}

export type TDocumento = {
    userId : string,
	appId: string,
	DocumentoIdentidade: string, 
	DocumentoEndereco: string,
	DocumentoAntecedente: string,
	DocumentoSefie: string,
    Latitude: string,
    Longitude: string,
}

export type TCards = {
    id:  string,
}

export type TDcuments = {
    id:  string,
}

export type TFavoriteProfessionals = {
    id:  string,
}

export type TFavoriteUsers = {
    id:  string,
}

export type CalendarioDTO = {
    criacao: string,
    expiracao: string
}

export type LocationDTO = {
    id: string,
    location: string,
    tipoCob: string,
    criacao: string
}

export type DevedorDTO = {
    cpf: string,
    nome: string
}

export type ValorDTO = {
    original: string
}

export type PixGNDTO = {
    endToEndId: string,
    txid: string,
    valor: string,
    chave: string,
    horario: string
}

export type QRCodeDTO = {
    qrcode: string,
    imagemQrcode: string
}

export type TPayments = {
    id: string,
    userId: string,
    appId: string,
    transactionId: string,
    endToEndId: string,
    paymentDate: string,    
    locationId: string,
    paymentMethod: string,
    qrcode: string,
    qrcodeText: string,
    digitableLine: string,
    barcodeData: string,
    barcode: string,
    amount: string,
    status: string,
    createAt: string,
    updateAt: string,    
}

export type TSchedule = {
    id:  string,
    userId: string,
    appId: string,
    scheduleDateTime: string,
    amount: string,
    status: boolean,
    createAt: string,
    updateAt: string,
}

export type TServices = {
    id:  string,
    appId : string,
    profissionalId : string,
    latitude : string,
    longitude : string,
    userId : string,
    amountValue : string,
    endTime : string,
    rateValue : string,
    scheduleId : string,
    schedule : TSchedule,
    serviceValue : string,
    order : number,
    startTime : string,
    status : boolean,
    proffisional : TUser,
    user : TUser,
    createAt : string,
    updateAt : string
}

export type TFavoritesSectionProps = {
    data: Array<TFavoriteData>,
    isLoading: boolean,
}