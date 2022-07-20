import { ISelectedUser, IUserResult } from "../../../interfaces"
import { api } from "../../../server"

export const fetchGetPerfilAgenda = async (
    params: ISelectedUser
): Promise<IUserResult> => {  
    //console.log(`/User/Agendar/${params.id}/${params.userId}/${params.appId}`);  
    const response = await api
        .get<any>(`/User/Agendar/${params.id}/${params.userId}/${params.appId}`)
        .then(({ data }) => data)
        .catch(({ error }) => error )
        //console.log(response);
    return response
}