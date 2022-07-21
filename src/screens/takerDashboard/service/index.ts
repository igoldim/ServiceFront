import { ICommentResult, ILoginResult, IScheduleDelete, IScheduleResult, IServiceResult, TLoadData } from "../../../interfaces"
import { api } from "../../../server"
import { TComment } from "../../../types/AppType"

//valida email
export const fetchData= async (
    params: TLoadData
): Promise<ILoginResult> => {    
    //console.log(`/User/GetTaker/${params.id}/${params.appid}`);    
    const response = await api
        .get<any>(`/User/GetTaker/${params.id}/${params.appid}`)
        .then(({ data }) => data)
        .catch(({ error }) => error )

    //console.log(response);  
    return response
}

//valida email
export const fetchGetAgendamentoProvider = async (
    params: IScheduleDelete
): Promise<IServiceResult> => {    
    //console.log(`/Service/GetScheduleDatailsProvider/${params.id}/${params.userId}/${params.appId}`);    
    const response = await api
        .get<any>(`/Service/GetScheduleDatailsProvider/${params.id}/${params.userId}/${params.appId}`)
        .then(({ data }) => data)
        .catch(({ error }) => error );
    //console.log(response);  
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

export const fetchUpgendamento = async (
    params: IScheduleDelete
): Promise<IScheduleResult> => {    
    //console.log(`/User/GetTaker/${params.id}/${params.appid}`);    
    const response = await api
        .put<any>(`/Service/Conclude/${params.id}/${params.userId}/${params.appId}`)
        .then(({ data }) => data)
        .catch(({ error }) => error )
    //console.log(response);  
    return response
}

export const fetchCancelAgendamento = async (
    params: IScheduleDelete
): Promise<IScheduleResult> => {    
    //console.log(`/User/GetTaker/${params.id}/${params.appid}`);    
    const response = await api
        .put<any>(`/Service/Canceled/${params.id}/${params.userId}/${params.appId}`)
        .then(({ data }) => data)
        .catch(({ error }) => error )

    //console.log(response);  
    return response
}

export const fetchAgendamentoComment = async (
    params: TComment
): Promise<ICommentResult> => {    
    console.log(params);    
    const response = await api
        .post<any>("/Comment", params )
        .then(({ data }) => data)
        .catch(({ error }) => error )
    console.log(response);  
    return response
}
