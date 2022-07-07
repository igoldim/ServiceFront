import { IEmailValidation, ILoginResult } from "../../../interfaces"
import { api } from "../../../server"

//valida email
export const fetchConfirmEmail= async (
    params: IEmailValidation
): Promise<ILoginResult> => {
    console.log(`/Secutiry/ConfirmEmail?email=${params.email}&token=${params.token}`);
    const response = await api
        .get<any>(`/Secutiry/ConfirmEmail?email=${params.email}&token=${params.token}`)
        .then(({ data }) => data)
    return response
}
