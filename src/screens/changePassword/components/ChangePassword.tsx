import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import RegularButton from "../../../components/Buttons/RegularButton";
import ScreenHead from "../../../components/Head/ScreenHead";
import RegularInput from "../../../components/Input/RegularInput";
import MessageAlertModal from "../../../components/Modals/MessageAlertModal";
import { useAppData } from "../../../services";
import { ScreensProps } from "../../../types/AppType";
import { fetchChangePassword } from "../services";
import { Container } from "./ChangePassword.s";

const ChangePassword: React.FC<ScreensProps> = ({navigation}) =>{
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    const [visible, setVisible] = React.useState(false);
    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [messageModal, setMessageModal] = React.useState('');
    const [type, setType] = React.useState("erro");


    const [userId, setUserId] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmePassword, setConfirmPassword] = React.useState('');

    React.useEffect(() =>{
    
        const loadData = async () => {
            const {primaryColor:strPrimaryColor, secondColor: strSecondColor, userId: UserId } = await useAppData();
            setUserId(UserId);
            setPrimaryColor(strPrimaryColor); 
            setSecondColor(strSecondColor); 
        };
    
    loadData();

    },[]);


    const handleChangePassword = async () => {
        
        //testa password
        if (password === "") {
            showModal("Erro", "Informe sua senha", "erro");
            return false;
        }

        if (confirmePassword === "") {
            showModal("Erro", "Informe a confirmação da senha", "erro");
            return false;
        }


        if (password !== confirmePassword) {
            showModal("Erro", "Senha não conferam", "erro");
            return false;
        }

        var { sucessful,  message } = await fetchChangePassword({userId, password});       

        if (sucessful) {
            showModal("Sucesso", message, "success");
        }
         
    }


    const showModal = (headText: string, message: string, type: string)=> {
        setMessageHeadding(headText);
        setMessageModal(message);
        setType(type);
        setVisible(true);
    }

    const modalButtonHandle = () =>{
        setVisible(false);
    }

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
                value={password}
                onChangeText={setPassword}
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
                value={confirmePassword}
                onChangeText={setConfirmPassword}
            />

            <RegularButton            
                btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center'}}
                textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                onPress={handleChangePassword}>
                Confirmar
            </RegularButton>

            <MessageAlertModal 
              visible={visible} 
              heading={messageHeadding} 
              message={messageModal} 
              onPress={modalButtonHandle}
              type={type}
              primaryColor={primaryColor}
              secondColor={secondColor}                
            />
        </Container>
    );
};

export default ChangePassword;