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
    targetTimeInSeconds: number;
    resendEmail: Dispatch<SetStateAction<number>>;
    resendStatus: string;
    resendingEmail: boolean;
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
    userName: string,
    scheduleDate: string,
    scheduleTime: string,
    amount: string,
    stars: number
}

export type TAgenda = {
    id: string,
    scheduleDate: string,
    scheduleTime: string,
    status: string,
    amount: string,
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
