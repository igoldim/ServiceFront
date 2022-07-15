import { GestureResponderEvent, ImageSourcePropType } from "react-native";
import { TServices} from "../../types/AppType";

export interface CardSectionProps {
    data: Array<TServices> | undefined;
    onPress?: ((event:GestureResponderEvent) => void | undefined);    
    primaryColor: string;
    secondColor: string;
    onRefresh?: () => void; 
    refreshing?: boolean;
}