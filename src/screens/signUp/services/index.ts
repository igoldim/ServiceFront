import { IRegister, IRegisterResult } from "../../../interfaces"
import { api } from "../../../server"

//valida email
export const fetchRegister= async (
    params: IRegister
): Promise<IRegisterResult> => {
    //console.log(params);
    const response = await api
        .post<any>('/Secutiry/Register', params)
        .then(({ data }) => data)
        .catch(({ error }) => error )
    //console.log(response);

    return response
}