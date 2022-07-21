import { IDefaultResult, ISelectedUser, ISetFavorite, IUserResult } from "../../../interfaces"
import { api } from "../../../server"

export const fetchGetPerfilAgenda = async (
    params: ISelectedUser
): Promise<IUserResult> => {  
    //console.log(params);
    const response = await api
        .post<any>(`/User/Agendar/`, params)
        .then(({ data }) => data)
        .catch(({ error }) => error )
        //console.log(response.data);
    return response
}

export const fetchFavorite = async (
    params: ISetFavorite
): Promise<IDefaultResult> => {  
    //console.log(params);
    const response = await api
        .post<any>(`/Favorite/`, params)
        .then(({ data }) => data)
        .catch(({ error }) => error )
    //    console.log(response);
    return response;
}