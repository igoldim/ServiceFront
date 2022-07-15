import { IDefaultUserGet, IScheduleResult } from "../../../interfaces"
import { api } from "../../../server"

//valida email
export const fetchScheduling = async (
    params: IDefaultUserGet
): Promise<IScheduleResult> => {
    //console.log(`User/Schedule/${params.userId}/${params.appId}`);
    const response = await api
        .get<any>(`User/Schedule/${params.userId}/${params.appId}`)
        .then(({ data }) => data)
        .catch(({ error }) => error )
    return response
}