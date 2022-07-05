import { IApp, IResultApp } from "../../../interfaces"
import { api } from "../../../server"

export const getApp= async (
    params: IApp
): Promise<IResultApp> => {
    const response = await api
        .get<any>(`Secutiry/GetApp?slug=${params.slug}&applicationKey=${params.applicationkey}`)
        .then(({ data }) => data)
    return response.data
}