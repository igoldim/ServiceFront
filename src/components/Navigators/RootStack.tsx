import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../Colors';

import Welcome from '../../screens/preload/components/Welcome';
import SignIn from '../../screens/signIn/components/SignIn';
import Comecar from '../../screens/comecar/components/Comecar';

import SignUp from '../../screens/signUp/components/SignUp';
import Profissional from '../../screens/signIn/professional/components/Profissional';
import User from '../../screens/signIn/user/components/User';
import EmailVerification from '../../screens/emailVerification/components/EmailVerification';
import Home from '../../screens/home/components/Home';
import Greeting from '../Head/Greeting';
import Profile from '../Head/Profile';

import avi from './../../assets/images/avatar.png'


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
                screenOptions={{
                    headerStyle:{
                        backgroundColor : Colors.Background,
                        borderBottomWidth : 0,
                        shadowColor: "transparent",
                        shadowOpacity: 0,
                        elevation: 0,
                        height: 120,
                    },
                    headerTintColor: Colors.Background,   
                    headerRightContainerStyle:{paddingRight: 25}, 
                    headerRight: () => (
                        <Profile img={avi} imageContainerStyle={{backgroundColor: Colors.Gray}}/>
                    ), 
                    headerLeftContainerStyle: {
                        paddingLeft: 10,
                    }               
                }}
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
                    options={{
                        headerTitle: (props) =>(
                            <Greeting 
                                mainText='Olá Igor!'
                                subtext='Que bom ter você de volta!'
                                {...props}>
                            </Greeting>
                        ),
                        headerLeft: () => (
                            <></>
                        )}
                    }                    
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