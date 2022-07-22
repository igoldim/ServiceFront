import { Extrapolation } from "react-native-reanimated";
import { IDefaultUserGet, ILogin, ILoginResult, IRecargaResult, IScheduleDelete, IServiceResult, TLoadData } from "../../../interfaces"
import { api } from "../../../server"

//valida email
export const fetchData= async (
    params: TLoadData
): Promise<ILoginResult> => {    
    const response = await api
        .get<any>(`/User/GetProvider/${params.id}/${params.appid}`)
        .then(({ data }) => data)
        .catch(({ error }) => error )
    return response
}


export const fetchConsultaPagamentos = async (
    params: IDefaultUserGet
): Promise<IRecargaResult> => {    
    //console.log(`/Pix/ConsultaPayments/${params.userId}/${params.appId}`);
    const response = await api
        .get<any>(`/Pix/ConsultaPayments/${params.userId}/${params.appId}`)
        .then(({ data }) => data)
        .catch(({ error }) => error )
    return response
}


export const fetchGetAgendamentoTaker = async (
    params: IScheduleDelete
): Promise<IServiceResult> => {    
    //console.log(`/Service/GetScheduleDatailsTaker/${params.id}/${params.userId}/${params.appId}`);    
    const response = await api
        .get<any>(`/Service/GetScheduleDatailsTaker/${params.id}/${params.userId}/${params.appId}`)
        .then(({ data }) => data)
        .catch(({ error }) => error );
    //console.log(response);  
    return response
}