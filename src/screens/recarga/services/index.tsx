import { IPaymentSearch, IRecargaRegister, IRecargaResult } from "../../../interfaces"
import { api } from "../../../server"

//valida email
export const fetchRecarregar = async (
    params: IRecargaRegister
): Promise<IRecargaResult> => {
    const response = await api
        .post<any>('/Pix/EnviarCobranca', params)
        .then(({ data }) => data)

    //console.log(response);

    return response
}

export const fetchConsultaPagamento = async (
 params : IPaymentSearch 
): Promise<IRecargaResult> => {
    const response = await api
        .get<any>(`/Pix/ConsultaStatus/${params.id}`)
        .then(({ data }) => data)
    //console.log(response);
    return response
}
