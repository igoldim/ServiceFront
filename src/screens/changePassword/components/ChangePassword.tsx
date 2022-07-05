import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import RegularButton from "../../../components/Buttons/RegularButton";
import ScreenHead from "../../../components/Head/ScreenHead";
import RegularInput from "../../../components/Input/RegularInput";
import { useAppData } from "../../../services";
import { ScreensProps } from "../../../types/AppType";
import { Container } from "./ChangePassword.s";

const ChangePassword: React.FC<ScreensProps> = ({navigation}) =>{
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");
    const [userType, setUserType] = React.useState<string>("");

    React.useEffect(() =>{
    
    const loadData = async () => {
      const {primaryColor:strPrimaryColor, secondColor: strSecondColor } = await useAppData();
      const UserType = await AsyncStorage.getItem('UserType');
      setUserType(UserType as string);

      setPrimaryColor(strPrimaryColor); 
      setSecondColor(strSecondColor); 
    };
    
    loadData();

  },[]);

    return(
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                screenName="Alterar Senha" 
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true} 
                onPress={() => navigation.navigate("Menu")} />
            <RegularInput 
                iconeName='form-textbox-password'
                iconeColor={primaryColor}
                title='Senha'
                placeholder="* * * * * *"
                placeholderColor={primaryColor}
                titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 20, fontWeight: '800'}}
                iconStyles={{borderColor: primaryColor}}
                ViewStyles={{marginTop: 40, marginBottom: 15}}
                isPassword={true}            
            />

            <RegularInput 
                iconeName='form-textbox-password'
                iconeColor={primaryColor}
                title='Confirme Senha'
                placeholder="* * * * * *"
                placeholderColor={primaryColor}
                titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 20, fontWeight: '800'}}
                iconStyles={{borderColor: primaryColor}}
                ViewStyles={{marginBottom: 30}}
                isPassword={true}            
            />

            <RegularButton            
                btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center'}}
                textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                onPress={() => {}}>
                Confirmar
            </RegularButton>
        </Container>
    );
};

export default ChangePassword;