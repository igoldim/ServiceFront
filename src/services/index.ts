import AsyncStorage from "@react-native-community/async-storage"
import { useNavigation } from "@react-navigation/native"
import { Modal } from "react-native"
import { IApp, IContextApp, IResultApp } from "./../interfaces"
import { api } from "./../server"

//valida email
export const getApp= async (
    params: IApp
): Promise<IResultApp> => {
    const response = await api
        .get<any>(`Secutiry/GetApp?slug=${params.slug}&applicationKey=${params.applicationkey}`)
        .then(({ data }) => data)
        .catch(({ error }) => error )
    return response.data
}

export const useAppData= async (): Promise<IContextApp> => {    
    const titulo = await AsyncStorage.getItem('titulo') as string;
    const subtitulo = await AsyncStorage.getItem('subtitulo') as string;
    const logo = await AsyncStorage.getItem('logo') as string;
    const primaryColor = await AsyncStorage.getItem('primaryColor') as string;
    const secondColor = await AsyncStorage.getItem('secondColor') as string;
    const versao = await AsyncStorage.getItem('versao') as string;
    const UserType = await AsyncStorage.getItem('UserType') as string;
    const appKey = await AsyncStorage.getItem('appKey') as string;
    const userId = await AsyncStorage.getItem("userId") as string;
    const Name = await AsyncStorage.getItem("Name") as string;
    const Email = await AsyncStorage.getItem("Email") as string;
    const Avatar = await AsyncStorage.getItem("Avatar") as string;

    const Latitude = await AsyncStorage.getItem("latitude") as string;
    const Longitude = await AsyncStorage.getItem("longitude") as string;

    const ActivateCode = await AsyncStorage.getItem("activateCode") as string;
    const IsLogado = await AsyncStorage.getItem("isLogged") as string;

    return {titulo
          , subtitulo
          , logo
          , primaryColor
          , secondColor
          , versao
          , UserType
          , appKey
          , userId
          , Name
          , Avatar
          , Latitude
          , Longitude
          , ActivateCode
          , Email
          , IsLogado  };
}

export const cleanData = async () => {    
    await AsyncStorage.removeItem('UserType');
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("Name");
    await AsyncStorage.removeItem("Email");
    await AsyncStorage.removeItem("Avatar");
    await AsyncStorage.removeItem("latitude");
    await AsyncStorage.removeItem("longitude");
    await AsyncStorage.removeItem("activateCode");    
    await AsyncStorage.removeItem("isLogged");       
}