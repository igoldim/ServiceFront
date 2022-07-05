import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../components/Navigators/RootStack";

export type EmailVerificationProps = StackScreenProps<RootStackParamList, "Welcome">;

export type InitialValues = {
    email: '', 
    password:''
}

