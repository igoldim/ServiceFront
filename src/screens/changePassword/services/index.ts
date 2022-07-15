import { IChangePassword, IDefaultResult } from "../../../interfaces"
import { api } from "../../../server"

//valida email
export const fetchChangePassword= async (
    params: IChangePassword
): Promise<IDefaultResult> => {
    const response = await api
        .post<any>('/Secutiry/ChangePassword', params)
        .then(({ data }) => data)
        .catch(({ error }) => error )
    return response
}