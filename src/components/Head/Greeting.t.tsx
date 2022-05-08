import { StyleProp, TextStyle } from 'react-native';

export interface GreetingProps {
    mainText: string;
    subtext: string;
    mainTextStyle?: StyleProp<TextStyle> | undefined;
    subTextStyle?: StyleProp<TextStyle> | undefined;
}
