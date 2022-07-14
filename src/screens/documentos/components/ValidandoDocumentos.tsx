import React from "react";
import RegularButton from "../../../components/Buttons/RegularButton";
import ScreenHead from "../../../components/Head/ScreenHead";
import { Container, StyledScrollView } from "../../../components/Shared";
import { useAppData } from "../../../services";
import { ScreensProps } from "../../../types/AppType";
import BigText from "../../../components/Texts/BigText";

const ValidandoDocumentos: React.FC<ScreensProps> = ({navigation}) =>{
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    React.useEffect(() =>{
        const loadData = async () => {
            const {primaryColor:strPrimaryColor, secondColor: strSecondColor } = await useAppData();
            setPrimaryColor(strPrimaryColor); 
            setSecondColor(strSecondColor); 
        };
        loadData();
    },[]);

    return (
        <Container style={{backgroundColor: primaryColor}}>
             <ScreenHead 
                screenName="Validação"  
                onPress={() => navigation.navigate("SignIn")}
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true}/>
             <StyledScrollView>
                <BigText>Aguarde, estamos validando seus documentos, isso pode levar até 72h.</BigText>
                <RegularButton            
                        btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 15}}
                        textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                        onPress={() => navigation.navigate("SignIn")}>
                        Sair
                </RegularButton>
            </StyledScrollView>      
        </Container>
    );
}

export default ValidandoDocumentos;