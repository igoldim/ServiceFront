import { StyleProp, TextStyle } from 'react-native';

export interface GreetingProps {
    mainText: string;
    subtext: string;
    mainTextStyle: StyleProp<TextStyle>;
    subTextStyle: StyleProp<TextStyle>;
}
