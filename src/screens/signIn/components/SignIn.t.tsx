import { RootStackParamList } from '../../../components/Navigators/RootStack';
import { StackScreenProps } from '@react-navigation/stack';

export type SignInProps = StackScreenProps<RootStackParamList, "Welcome">;

export interface IUser {
    id:	string;
    register:	string;
    nullable: true;
    avatar:	string;
    avatarFile:	Blob | null;
    name:	string;
    phone:	string;
    email:	string;
    zip:	string;
    address:	string;
    number:	string;
    complement:	string;
    district:	string;
    city:	string;
    state:	string;
    password:	string;
    activateCode:	string;
    status:	boolean;
    createAt:	string;
    updateAt:	string;
    userType: string;
    //cards:	[...];
    //professionals	[...];
    //services	[...];
}


export interface IUserRegister{
    name:	string;
    email:	string;
    password:	string;
    userType:	string;
}


export interface IUserLogin {
    email:	string;
    password:	string;
}

export interface IResultLogin {
    sucessful:	boolean;
    token?: string;
    data?:	IUser;
    message: string;
    type?: string;
}

export interface IEmailValidation {
    email:	string;
    token:	string;
}