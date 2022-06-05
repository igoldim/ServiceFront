import React from 'react';

import { Colors } from '../../../components/Colors';
import BigText from '../../../components/Texts/BigText';
import SmallText from '../../../components/Texts/SmallText';
import RegularButton from '../../../components/Buttons/RegularButton';

import backgraoundImage from "../../../assets/images/logo.png";
import { WelcomeProps } from './Welcome.t';
import { BottonSection, TopImage, TopSection, WelcomeContainer } from './Welcome.s';
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator } from 'react-native';

const Welcome: React.FC<WelcomeProps> = ({navigation}) => {

    const [versao, setVersao] = React.useState("0.0.000");
    const [isLogged, setIsLogged] = React.useState(false);
    const [indicator, setIndicator] = React.useState(false);

    React.useEffect(()=>{
        const handleUserName = async () => {
            setIndicator(true);
            const strVersao = await AsyncStorage.getItem("versao");
            setVersao( strVersao ? strVersao : versao);

            const userType = await AsyncStorage.getItem("userType");
            const res = await  AsyncStorage.getItem('isLogged');

            if (res === "true" && userType === "T") {
                navigation.navigate("HomeTomador");
            }
            else if (res === "true" && userType === "P") {
                navigation.navigate("HomePrestador");
            }
            else{
                setIsLogged(false);
            }
            setIndicator(false);
        };
        handleUserName();
        return () => { setIsLogged(false); }
    }, [isLogged]);

    

    return (
        <>           
            <WelcomeContainer>
                <TopSection>
                    <TopImage source={backgraoundImage} />
                </TopSection>
                <BottonSection>
                    <BigText textStyles={{width:"70%", marginBottom:25}}>The Cleaner App</BigText>
                    <SmallText textStyles={{width:"100%", marginBottom:25}}>Sistema de agendamento e execução de diárias profissional.</SmallText>
                    {!indicator && 
                    <RegularButton textStyles={{color:Colors.Background}} btnStyles={{marginBottom:50}} onPress={()=>{navigation.navigate("Comecar")}}>Vamos começar!</RegularButton>}
                    {indicator &&<ActivityIndicator size={30} color={Colors.White} />}
                    <SmallText textStyles={{color:Colors.White, textAlign:'center'}} >Versão {versao}</SmallText>
                </BottonSection>
            </WelcomeContainer>
        </>
    );
};  

export default Welcome;