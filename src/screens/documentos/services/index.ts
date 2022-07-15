import { ILoginResult } from "../../../interfaces";
import { api } from "../../../server";
import { TDocumento } from "../../../types/AppType";

export const fetchDocumento = async (
    params: TDocumento
): Promise<ILoginResult> => {

    const formData = new FormData();

    formData.append('UserId', params.userId);
    formData.append('AppID', params.appId);
   
    formData.append('DocumentoIdentidade', {
        uri: params.DocumentoIdentidade,
        type: 'image/jpeg', 
        name: "documentoIdentidade.jpg",
    });

    formData.append('DocumentoEndereco', {
        uri: params.DocumentoEndereco,
        type: 'image/jpeg', 
        name: "documentoEndereco.jpg",
    });

    formData.append('DocumentoAntecedente', {
        uri: params.DocumentoAntecedente,
        type: 'image/jpeg', 
        name: "documentoAntecedente.jpg",
    });

    formData.append('DocumentoSefie', {
        uri: params.DocumentoSefie,
        type: 'image/jpeg', 
        name: "documentoSefie.jpg",
    });

    formData.append('latitude', params.Latitude);
    formData.append('longitude', params.Longitude);

    //console.log(formData);
    
    const response = await api
        .post<any>('/Secutiry/DocumentoUpload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(({ data }) => data)
        .catch(({ error }) => error )
    //console.log(formData);
    return response;
}