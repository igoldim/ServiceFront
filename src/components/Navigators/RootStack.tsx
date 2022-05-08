import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../Colors';

import Welcome from '../../screens/preload/components/Welcome';
import SignIn from '../../screens/signIn/components/SignIn';
import Comecar from '../../screens/comecar/components/Comecar';
import Profissional from '../../screens/comecar/professional/components/Profissional';
import User from '../../screens/comecar/user/components/User';

import SignUp from '../../screens/signUp/components/SignUp';
import EmailVerification from '../../screens/emailVerification/components/EmailVerification';
import Home from '../../screens/home/components/Home';

export type RootStackParamList = {
    Welcome : undefined,
    SignIn: undefined,
    Profissional: undefined,
    User: undefined,
    Comecar : undefined,
    SignUp : undefined,
    EmailVerification : undefined,
    Home : undefined,
}


const Stack = createStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Welcome"
            >
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{headerShown:false }}                    
                />
                
                <Stack.Screen
                    name="Home"
                    component={Home}     
                    options={{headerShown:false }}                              
                />

                <Stack.Screen 
                    name="SignIn" 
                    component={SignIn} 
                    options={{headerShown:false }} />

                <Stack.Screen 
                    name="Comecar" 
                    component={Comecar} 
                    options={{headerShown:false }} />                

                <Stack.Screen 
                    name="Profissional" 
                    component={Profissional} 
                    options={{headerShown:false }} />

                <Stack.Screen 
                    name="User" 
                    component={User} 
                    options={{headerShown:false }} />

                <Stack.Screen 
                    name="SignUp" 
                    component={SignUp} 
                    options={{headerShown:false }} />

                <Stack.Screen 
                    name="EmailVerification" 
                    component={EmailVerification} 
                    options={{headerShown:false }} />

            </Stack.Navigator> 
        </NavigationContainer>
    );
};  

export default RootStack;