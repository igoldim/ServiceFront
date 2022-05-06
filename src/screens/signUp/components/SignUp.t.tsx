import { RootStackParamList } from '../../../components/Navigators/RootStack';
import { StackScreenProps } from '@react-navigation/stack';

export type SignUpProps = StackScreenProps<RootStackParamList, "Welcome">;

export type InitialValues = {
    fullName: '',
    email: '', 
    password:'',
    rePassword:'',
}