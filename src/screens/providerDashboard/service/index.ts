import { Extrapolation } from "react-native-reanimated";
import { ILogin, ILoginResult, TLoadData } from "../../../interfaces"
import { api } from "../../../server"

//valida email
export const fetchData= async (
    params: TLoadData
): Promise<ILoginResult> => {    
    //console.log(`/User/GetProvider/${params.id}/${params.appid}`);    
    const response = await api
        .get<any>(`/User/GetProvider/${params.id}/${params.appid}`)
        .then(({ data }) => data)
    return response
}
