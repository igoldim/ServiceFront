import { IDefaultResult, ISelectedSchedule, IUserResult } from "../../../interfaces"
import { api } from "../../../server"

export const fetchSetSchedule = async (
    params: ISelectedSchedule
): Promise<IDefaultResult> => {  
    //console.log(params);
    const response = await api
        .post<any>(`/Service`, params)
        .then(({ data }) => data)
        .catch(({ error }) => error )
    
    //console.log(response);

    return response
}