import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../../screens/preload/components/Welcome';
import Start from '../../screens/start/components/Start';
import StartTaker from '../../screens/startTaker/components/StartTaker';
import StartProvider from '../../screens/startProvider/components/StartProvider';
import SignUp from '../../screens/signUp/components/SignUp';
import SignIn from '../../screens/signIn/components/SignIn';
import EmailVerification from '../../screens/emailVerification/components/EmailVerification';
import TakerDashboard from '../../screens/takerDashboard/components/TakerDashboard';
import ProviderDashboard from '../../screens/providerDashboard/components/ProviderDashboard';
import Scheduling from '../../screens/scheduling/components/Scheduling';
import Favorites from '../../screens/favorites/components/Favorites';
import Perfil from '../../screens/perfil/components/Perfil';
import Endereco from '../../screens/endereco/components/Endereco';
import ChangePassword from '../../screens/changePassword/components/ChangePassword';
import Recarga from '../../screens/recarga/components/Recarga';
import RecargaPagarPix from '../../screens/recarga/components/RecargaPagarPix';
import Agenda from '../../screens/agenda/components/Agenda';
import RecargaPagarCartao from '../../screens/recarga/components/RecargaPagarCartao';
import Documentos from '../../screens/documentos/components/Documentos';
import Resultado from '../../screens/resultado/components/Resultado';
import Agendar from '../../screens/agendar/components/Agendar';
import Confirmar from '../../screens/confirmar/components/Confirmar';
import ValidandoDocumentos from '../../screens/documentos/components/ValidandoDocumentos';
import ProviderTransaction from '../../screens/providerTransaction/components/ProviderTransaction';
import ScheduleDatailsProvider from '../../screens/scheduleDatailsProvider/components/ScheduleDatailsProvider';
//

import Menu from '../Menu/Menu';

export type RootStackParamList = {
    Welcome : undefined,
    Start : undefined,
    StartTaker : undefined,
    StartProvider: undefined,
    SignUp: undefined,
    SignIn: undefined,
    TakerDashboard: undefined,
    ProviderDashboard: undefined,
    EmailVerification : undefined,
    Menu: undefined,
    Scheduling: undefined,
    Favorites: undefined,
    Perfil: undefined,
    Endereco: undefined,
    ChangePassword: undefined;
    Recarga: undefined;
    RecargaPagarPix: undefined;
    Agenda: undefined;
    RecargaPagarCartao: undefined;
    Documentos: undefined;
    Resultado: undefined;
    Agendar: undefined;
    Confirmar: undefined;
    ValidandoDocumentos: undefined;
    ProviderTransaction: undefined;
    ScheduleDatailsProvider: undefined;
}


const Stack = createStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                detachInactiveScreens={true}
                initialRouteName="Welcome">                
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}                                        
                    options={{headerShown:false}} />

                <Stack.Screen
                    name="Start"
                    component={Start}
                    options={{headerShown:false }} />

                <Stack.Screen
                    name="StartTaker"
                    component={StartTaker}
                    options={{headerShown:false }} />

                <Stack.Screen
                    name="StartProvider"
                    component={StartProvider}
                    options={{headerShown:false }} />

                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{headerShown:false }} />

                <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{headerShown:false }} />

                <Stack.Screen
                    name="TakerDashboard"
                    component={TakerDashboard}
                    options={{headerShown:false }} />

                <Stack.Screen
                    name="ProviderDashboard"
                    component={ProviderDashboard}
                    options={{headerShown:false }} />              

                <Stack.Screen
                    name="Perfil"
                    component={Perfil}
                    options={{headerShown:false }} />  

                <Stack.Screen
                    name="ChangePassword"
                    component={ChangePassword}
                    options={{headerShown:false }} />  


                <Stack.Screen
                    name="Endereco"
                    component={Endereco}
                    options={{headerShown:false }} />  

                <Stack.Screen
                    name="Scheduling"
                    component={Scheduling}
                    options={{headerShown:false }} />  

                <Stack.Screen
                    name="Favorites"
                    component={Favorites}
                    options={{headerShown:false }} />  

                <Stack.Screen 
                    name="EmailVerification" 
                    component={EmailVerification} 
                    options={{headerShown:false }} />

                <Stack.Screen
                    name="Recarga"
                    component={Recarga}
                    options={{headerShown:false }} />  

                <Stack.Screen
                    name="Agenda"
                    component={Agenda}
                    options={{headerShown:false }} />

                <Stack.Screen
                    name="Resultado"
                    component={Resultado}
                    options={{headerShown:false }} />

                <Stack.Screen
                    name="Confirmar"
                    component={Confirmar}
                    options={{headerShown:false }} />                    

                <Stack.Screen
                    name="RecargaPagarPix"
                    component={RecargaPagarPix}
                    options={{headerShown:false }} />  

                <Stack.Screen
                    name="RecargaPagarCartao"
                    component={RecargaPagarCartao}
                    options={{headerShown:false }} />  

                <Stack.Screen
                    name="Documentos"
                    component={Documentos}
                    options={{headerShown:false }} /> 

                <Stack.Screen
                    name="Agendar"
                    component={Agendar}
                    options={{headerShown:false }} />                  
                    
                <Stack.Screen
                    name="ScheduleDatailsProvider"
                    component={ScheduleDatailsProvider}
                    options={{headerShown:false }} />

                <Stack.Screen
                    name="ValidandoDocumentos"
                    component={ValidandoDocumentos}
                    options={{headerShown:false }} />

                <Stack.Screen
                    name="ProviderTransaction"
                    component={ProviderTransaction}
                    options={{headerShown:false }} />

                <Stack.Screen 
                    name="Menu" 
                    component={Menu} 
                    options={{headerShown:false }} />
            </Stack.Navigator> 
        </NavigationContainer>
    );
};  

export default RootStack;