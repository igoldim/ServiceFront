import { GestureResponderEvent, ImageSourcePropType } from "react-native";
import { Users } from "../../types/AppType";

export interface CardSectionProps {
    data: Array<Users>;
    onPress?: ((event:GestureResponderEvent) => void | undefined);    
    primaryColor: string;
    secondColor: string;
}