import { IDefaultUserGet, ILoginResult } from "../../../interfaces"
import { api } from "../../../server"

//valida email
export const fetchFavorite = async (
    params: IDefaultUserGet
): Promise<ILoginResult> => {
     //console.log(`/User/Favorite/${params.userId}/${params.appId}`);
    const response = await api
        .get<any>(`/User/Favorite/${params.userId}/${params.appId}`)
        .then(({ data }) => data)
   
    return response
}