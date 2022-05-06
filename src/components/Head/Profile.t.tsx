import { GestureResponderEvent, Image, ImageSourcePropType, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { GestureEvent } from 'react-native-gesture-handler';

export interface ProfileProps {
    img: ImageSourcePropType;
    imageStyle?: StyleProp<ImageStyle>;
    imageContainerStyle?: StyleProp<ViewStyle>;
    onPress?: ((event: GestureResponderEvent) => void | undefined)
}
