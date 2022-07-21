import { ILoginResult, TLoadData } from "../../../interfaces"
import { api } from "../../../server"

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
export const fetchGetAgendamento = async (
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

export const fetchUpAgendamento = async (
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

export const fetchCancelAgendamento = async (
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


export const fetchAgendamentoComment = async (
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
