import { ILoginResult } from "../../../interfaces"
import { api } from "../../../server"
import { TUserPerfil } from "../../../types/AppType"

export const fetchGetPerfil = async (
    id: string
): Promise<ILoginResult> => {    
    const response = await api
        .get<any>(`/User/${id}`)
        .then(({ data }) => data)
        .catch(({ error }) => error )
        //console.log(response);
    return response
}

export const fetchPerfil = async (
    params: TUserPerfil
): Promise<ILoginResult> => {

    const formData = new FormData();

    formData.append('UserId', params.userId);
    formData.append('Avatar', params.avatar);
   
    if (params.avatarFile){
        formData.append('AvatarFile', {
            uri: params.avatarFile,
        type: 'image/jpeg', 
        name: "imagename.jpg",
        });
    }
    formData.append('name', params.name);

    //console.log(formData);
    
    const response = await api
        .put<any>('/User/Perfil', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(({ data }) => data)
        .catch(({ error }) => error )
    return response;
}