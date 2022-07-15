import { IAgendaResult, IDefaultUserGet, IAgendaRegister, IScheduleDelete, IAgendaUpdate } from "../../../interfaces"
import { api } from "../../../server"


//valida email
export const fetchLoad = async (
    params: IDefaultUserGet
): Promise<IAgendaResult> => {
    //console.log(params);
    const response = await api
        .get<any>(`/Schedule/${params.userId}/${params.appId}`)
        .then(({ data }) => data)

    //console.log(response);

    return response
}
//valida email
export const fetchIncluir = async (
    params: IAgendaRegister
): Promise<IAgendaResult> => {
    //console.log(params);
    const response = await api
        .post<any>('/Schedule', params)
        .then(({ data }) => data)
        .catch(({ error }) => error )
    //console.log(response);

    return response
}

export const fetchAtualizar = async (
    params: IAgendaUpdate
): Promise<IAgendaResult> => {
    //console.log(params);
    const response = await api
        .put<any>('/Schedule', params)
        .then(({ data }) => data)
        .catch(({ error }) => error )
    //console.log(response);

    return response
}

export const fetchDeletar = async (
    params: IScheduleDelete
): Promise<IAgendaResult> => {
    //console.log(`/Schedule/${params.id}/${params.userId}/${params.appId}`);
    const response = await api
        .delete<any>(`/Schedule/${params.id}/${params.userId}/${params.appId}`)
        .then(({ data }) => data)
        .catch(({ error }) => error )
    //console.log(response);

    return response
}