import { api } from '../../../server';
import { IEmailValidation, IResultLogin, IUserLogin, IUserRegister } from '../components/SignIn.t';

//efetua login
export const fetchLogin= async (
    params: IUserLogin
): Promise<IResultLogin> => {
    const response = await api
        .post<any>(`/Auth/Authenticate`, params)
        .then(({ data }) => data)
    return response
}


//valida email
export const fetchResetPassword= async (
    params: string
): Promise<IResultLogin> => {
    const response = await api
        .get<any>(`/Auth/ResetPassword?email=${params}`)
        .then(({ data }) => data)
    return response
}
