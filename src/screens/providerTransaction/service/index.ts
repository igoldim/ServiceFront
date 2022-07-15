import { IDefaultUserGet, IPaymentsResult } from "../../../interfaces"
import { api } from "../../../server"

export const fetchConsultaPagamentos = async (
    params: IDefaultUserGet
): Promise<IPaymentsResult> => {    
    //console.log(`/Pix/ConsultaPayments/${params.userId}/${params.appId}`);
    const response = await api
        .get<any>(`/Payment/${params.userId}/${params.appId}`)
        .then(({ data }) => data)
        .catch(({ error }) => error )
    return response
}
