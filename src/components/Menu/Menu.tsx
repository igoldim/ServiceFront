import React from "react";
import ScreenHead from "../Head/ScreenHead";
import { Container, Rodape } from "./Menu.s";
import { useAppData } from "../../services";
import { ScreensProps } from "../../types/AppType";
import { Row } from "../Shared";
import MenuItem from "./MenuItem";
import { View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const Menu: React.FC<ScreensProps> = ({navigation}) => {

    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");
    const [versao, setVersao] = React.useState("");
    const [userType, setUserType] = React.useState("");

    React.useEffect(() =>{     
        loadData();
    },[]);

    
    const loadData = async () => {
        const {primaryColor:strPrimaryColor, secondColor: strSecondColor, versao: strVsrsao, UserType } = await useAppData();
        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 
        setVersao(strVsrsao);
        setUserType(UserType);
    };

    const handleSair = async () => {
        await AsyncStorage.removeItem("userId");
        await AsyncStorage.removeItem("Name");
        await AsyncStorage.removeItem("Avatar");
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("UserType");
        await AsyncStorage.setItem("isLogged", "false");
        navigation.navigate('Welcome');
    }

    return (
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                showIcon={true} 
                screenName="Menu" 
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                onPress={() => navigation.navigate(userType === "1" ? "ProviderDashboard" : "TakerDashboard")} 
                showVersion={true} 
                version={versao}/>           
                <View style={{marginTop: 80}}>
                    <Row>
                        <MenuItem 
                            icon="edit" 
                            title="Perfil" 
                            onPress={() => navigation.navigate("Perfil")}
                            primaryColor={primaryColor}
                            secondColor={secondColor}
                            />
                    </Row>
                    <Row>
                        <MenuItem 
                            icon="calendar-today" 
                            title={userType === "1" ? "Agenda": "Agendamentos"} 
                            onPress={() => userType === "1" ? navigation.navigate("Agenda") : navigation.navigate("Scheduling") }
                            primaryColor={primaryColor}
                            secondColor={secondColor}
                            />
                    </Row>
                    {userType === "0" && <Row>
                        <MenuItem 
                            icon="favorite" 
                            title="Favoritos" 
                            onPress={() => navigation.navigate("Favorites")}
                            primaryColor={primaryColor}
                            secondColor={secondColor}
                            />
                    </Row>
                    }
                    {userType === "1" && 
                    <>
                        <Row>
                            <MenuItem 
                                icon="check-circle" 
                                title="Recarga" 
                                onPress={() => navigation.navigate("Recarga")}
                                primaryColor={primaryColor}
                                secondColor={secondColor}
                                />
                        </Row>
                        <Row>
                        <MenuItem 
                            icon="text-snippet" 
                            title="Transações" 
                            onPress={() => {}}
                            primaryColor={primaryColor}
                            secondColor={secondColor}
                            />
                        </Row>
                    </>
                    }
                    <Row>
                        <MenuItem 
                            icon="lock" 
                            title="Alterar Senha" 
                            onPress={() => navigation.navigate("ChangePassword")}
                            primaryColor={primaryColor}
                            secondColor={secondColor}
                            />
                    </Row>
                    {/*<Row>
                        <MenuItem 
                            icon="settings" 
                            title="Configurações" 
                            onPress={() => {}}
                            primaryColor={primaryColor}
                            secondColor={secondColor}
                            />
                       </Row>*/}                 
                </View>
                <Rodape>
                    <MenuItem 
                        icon="exit-to-app" 
                        title="Sair" 
                        onPress={handleSair}
                        primaryColor={primaryColor}
                        secondColor={secondColor}
                        />
                </Rodape>
        </Container>
    );
}

export default Menu;