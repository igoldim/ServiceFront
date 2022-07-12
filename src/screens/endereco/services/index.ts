import { ICepResult, IEndereco, IRegisterResult } from "../../../interfaces"
import { api, apiCEP } from "../../../server"

export const fetchCep = async (
    id: string
): Promise<ICepResult> => {
    const response = await apiCEP
        .get<any>(`${id}/json`)
        .then(({ data }) => data)
    return response
}


export const fetchEndereco = async (
    params: IEndereco
): Promise<IRegisterResult> => {
    const response = await api
        .put<any>(`User/Endereco/`, params)
        .then(({ data }) => data)
    return response
}

