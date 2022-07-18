import { ISerach, TSearchResult } from "../../../interfaces"
import { api } from "../../../server"

//valida email
export const fetchSearchByQ = async (
    params: ISerach
): Promise<TSearchResult> => {
    //console.log(params);
    const response = await api
        .post<any>(`/User/Search/`, params )
        .then(({ data }) => data)
        .catch(({ error }) => error )

    //console.log(response);
    return response
}

export const fetchSearchByLocation = async (
    params: ISerach
): Promise<TSearchResult> => {
    //console.log(params);
    const response = await api
        .post<any>(`/User/SearchByLocation/`, params)
        .then(({ data }) => data)
        .catch(({ error }) => error )
    return response
}