import { ILoginResult } from "../../../interfaces"
import { api } from "../../../server"
import { TUser } from "../../../types/AppType"

export const fetchGetPerfil = async (
    id: string
): Promise<ILoginResult> => {
    const response = await api
        .get<any>(`/User/${id}`)
        .then(({ data }) => data)
    return response
}

export const fetchPerfil = async (
    params: TUser
): Promise<ILoginResult> => {

    const formData = new FormData();

    formData.append('id', params.id);
    formData.append('register', params.register);
    formData.append('avatar', params.avatar);
    formData.append('avatarfile', {
        uri: "file://",
       type: 'image/jpeg', 
       name: "imagename.jpg",
    });
    formData.append('name', params.name);
    formData.append('phone', params.name);
    formData.append('email', params.name);

    const response = await api
        .post<any>('/User', params)
        .then(({ data }) => data)
    return response
}