import { GestureResponderEvent, ImageSourcePropType } from "react-native";
import { Users } from "../Modals/ModalScheduling";

export interface CardProps  {
    id: string;
    userName: string; //Igor Goldim
    userAddress: string; // Rua Gabriel Junqueira, 00
    userAddressDistrict: string; //Serra Dourada 3 Etapa
    userAddressCity: string; // Aparecida de Goainia
    userAddressState: string; // GO
    userAddressComplement: string; // QD 55 LT 22 Casa 01
    scheduleDate: string;  // 07/05/2022  ==> pegar dia da semana (Sabádo)
    scheduleTime: string;  // 08:00
    userImage: ImageSourcePropType;
}

export interface CardSectionProps {
    data: Array<Users>;
    onPress?: ((event:GestureResponderEvent) => void | undefined);    
}