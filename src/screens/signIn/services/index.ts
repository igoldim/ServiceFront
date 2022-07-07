import { ILogin, ILoginResult } from "../../../interfaces"
import { api } from "../../../server"

//valida email
export const fetchLogin= async (
    params: ILogin
): Promise<ILoginResult> => {
    const response = await api
        .post<any>('/Secutiry/Authentication', params)
        .then(({ data }) => data)

    //console.log(response);

    return response
}

//valida email
export const fetchResetPassword= async (
    params: string
): Promise<ILoginResult> => {
    const response = await api
        .get<any>(`/Secutiry/ResetPassword?email=${params}`)
        .then(({ data }) => data)
    return response
}
