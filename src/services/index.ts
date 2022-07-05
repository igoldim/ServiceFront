import AsyncStorage from "@react-native-community/async-storage"
import { IApp, IContextApp, IResultApp } from "./../interfaces"
import { api } from "./../server"

//valida email
export const getApp= async (
    params: IApp
): Promise<IResultApp> => {
    const response = await api
        .get<any>(`Secutiry/GetApp?slug=${params.slug}&applicationKey=${params.applicationkey}`)
        .then(({ data }) => data)
    return response.data
}

export const useAppData= async (): Promise<IContextApp> => {
    const titulo = await AsyncStorage.getItem('titulo') as string;
    const subtitulo = await AsyncStorage.getItem('subtitulo') as string;
    const logo = await AsyncStorage.getItem('logo') as string;
    const primaryColor = await AsyncStorage.getItem('primaryColor') as string;
    const secondColor = await AsyncStorage.getItem('secondColor') as string;
    const versao = await AsyncStorage.getItem('versao') as string;
    const userType = await AsyncStorage.getItem('UserType') as string;
    const appKey = await AsyncStorage.getItem('appKey') as string;
    
    return {titulo, subtitulo, logo, primaryColor, secondColor, versao, userType, appKey};
}

