import { api } from '../../../server';
import { IEmailValidation, IResultLogin, IUserRegister } from '../../signIn/components/SignIn.t'


//efetua registro
export const fetchRegister= async (
    params: IUserRegister
): Promise<IResultLogin> => {
    //console.log(params);
    const response = await api
        .post<any>(`/Auth/Register`, params)
        .then(({ data }) => data)
    return response
}



//valida email
export const fetchConfirmEmail= async (
    params: IEmailValidation
): Promise<IResultLogin> => {
    const response = await api
        .get<any>(`/Auth/ConfirmEmail?email=${params.email}&token=${params.token}`)
        .then(({ data }) => data)
    return response
}

