import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import { ActivityIndicator, Image, PermissionsAndroid } from "react-native";
import RegularButton from "../../../components/Buttons/RegularButton";
import ScreenHead from "../../../components/Head/ScreenHead";
import RegularInput from "../../../components/Input/RegularInput";
import { StyledScrollView } from "../../../components/Shared";
import { useAppData } from "../../../services";
import { ScreensProps } from "../../../types/AppType";
import { fetchGetPerfil, fetchPerfil } from "../services";
import { Container, IconImg } from "./Perfil.s";
import * as ImagePicker from 'react-native-image-picker';
import MessageAlertModal from "../../../components/Modals/MessageAlertModal";

const Perfil: React.FC<ScreensProps> = ({navigation}) =>{
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");
    const [userType, setUserType] = React.useState<string>("");

    const [userName, setUserNAme] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [registro, setRegistro] = React.useState<string>("");
    const [avatar, setAvatar] = React.useState<string>("https://imagens.circuit.inf.br/noAvatar.png");
    const [avatarFile, setAvatarFile] = React.useState<string | null>(null);
    const [endereco, setEndereco] = React.useState<string>("");

    const [isLoading, setLoading] = React.useState(false);

    const [visible, setVisible] = React.useState(false);
    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [messageModal, setMessageModal] = React.useState('');
    const [type, setType] = React.useState("erro");

    React.useEffect(() =>{
        loadData();
    },[]);

    const loadData = async () => {
        const {primaryColor:strPrimaryColor, secondColor: strSecondColor, userId, Avatar } = await useAppData();
        const UserType = await AsyncStorage.getItem('UserType');
        setAvatar(Avatar);
        setUserType(UserType as string);
        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 

        //carrega dados da api
        var { sucessful, data, message } = await fetchGetPerfil(userId); 
        if (sucessful){
            setAvatar(data.avatar!.toString());
            await AsyncStorage.setItem("Avatar", data.avatar!.toString());
            setUserNAme(data.name);
            setEmail(data.email as string);
            setRegistro(data.register as string);

            setEndereco(`${data.number} - ${data.address?.substring(0,19)}...`)
        }

    };

    const handSendData = async () => {
        setLoading(true);

        //valida dados de entrada
        if (userName === "") {
            setLoading(false);
            showModal("Erro", "Informe seu nome", "erro");
            return false;
        }

        const { userId } = await useAppData();
        const {sucessful, data, message} = await fetchPerfil({userId, avatar, avatarFile, name: userName});

        if (sucessful){
            showModal("Parabéns,", message , "success");    
            loadData();
        }
        setLoading(false);
    }
    const handlePicture = async () => {
        try {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "App Camera Permission",
                message:"App needs access to your camera ",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
            );

            const grantedstorage = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                  title: "App Camera Permission",
                  message:"App needs access to your camera ",
                  buttonNeutral: "Ask Me Later",
                  buttonNegative: "Cancel",
                  buttonPositive: "OK"
                }
              );

              const grantedstorageread = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                  title: "App Camera Permission",
                  message:"App needs access to your camera ",
                  buttonNeutral: "Ask Me Later",
                  buttonNegative: "Cancel",
                  buttonPositive: "OK"
                }
              );

            if (granted === PermissionsAndroid.RESULTS.GRANTED && grantedstorage ===  PermissionsAndroid.RESULTS.GRANTED && grantedstorageread ===  PermissionsAndroid.RESULTS.GRANTED) {
                await ImagePicker.launchCamera({mediaType: 'photo', saveToPhotos: true, quality: 0.2, cameraType:'front'}, (data) =>{

                    if (data.assets){
                        setAvatarFile(data.assets[0].uri?.toString() as string);
                    }
                });
            } else {
            console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
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
                screenName="Perfil" 
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true} 
                onPress={() => navigation.navigate("Menu")} />
            <StyledScrollView>
                <IconImg style={{backgroundColor: secondColor, marginTop: 10}} onPress={handlePicture}>
                        <Image 
                            source={{uri: avatarFile ? avatarFile : avatar, width: 150, height:150 }}
                            style={{borderRadius: 100}}/>
                </IconImg>
                <RegularInput 
                    iconeName='account'
                    iconeColor={primaryColor}
                    title='Nome Completo'
                    placeholder="Digite seu nome"
                    placeholderColor={primaryColor}
                    titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                    inputStyles={{color: primaryColor, fontSize: 16, fontWeight: '800', width:'85%'}}
                    ViewStyles={{backgroundColor: secondColor}}
                    iconStyles={{borderColor: primaryColor}}
                    value={userName}
                    onChangeText={setUserNAme}
                />
                <RegularInput 
                    iconeName='email'
                    iconeColor={primaryColor}
                    title='E-mail'
                    keyboardType='email-address'
                    placeholder="Digite seu email"
                    placeholderColor={primaryColor}
                    editable={false}
                    titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                    inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800', width:'85%'}}
                    iconStyles={{borderColor: primaryColor}}
                    ViewStyles={{backgroundColor: secondColor}}
                    value={email}
                    onChangeText={setEmail}
                />
                
                <RegularInput 
                    iconeName='card-account-details'
                    iconeColor={primaryColor}
                    title='CPF'
                    placeholder="Digite seu cpf"
                    keyboardType="number-pad"
                    editable={false}
                    placeholderColor={primaryColor}
                    titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                    inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800', width:'85%'}}
                    iconStyles={{borderColor: primaryColor}}
                    ViewStyles={{backgroundColor: secondColor}}
                    value={registro}
                    onChangeText={setRegistro}
                />
                
                <RegularInput 
                    iconeName='google-maps'
                    iconeColor={primaryColor}
                    title='Endereço'
                    placeholder="Informe seu endereço"
                    ShowMenu={true}      
                    editable={false}              
                    onPressMenu={() =>
                        navigation.reset({
                            index: 1,
                            routes: [
                              { name: 'Endereco' },
                            ],
                          })}
                    placeholderColor={primaryColor}
                    titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                    inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800'}}
                    iconStyles={{borderColor: primaryColor}}
                    ViewStyles={{backgroundColor: secondColor}}
                    value={endereco}

                />

                {userType === "P" &&
                <>
                    <RegularInput 
                        iconeName='currency-usd'
                        iconeColor={primaryColor}
                        title='Valor'
                        placeholder="0,00"
                        keyboardType="number-pad"
                        placeholderColor={primaryColor}
                        titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                        inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800'}}
                        iconStyles={{borderColor: primaryColor}}
                    />

                    <RegularInput 
                        iconeName='text-box'
                        iconeColor={primaryColor}
                        title='Situação Cadastral'
                        placeholder="Avaliando documentação..."
                        ShowMenu={true}      
                        editable={false}              
                        onPressMenu={() =>navigation.navigate("Documentos")}
                        placeholderColor={primaryColor}
                        titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                        inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800'}}
                        iconStyles={{borderColor: primaryColor}}
                    />
                </>
                }

            {isLoading && <RegularButton 
                btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 15}}
                textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                disabled={true}>
                    <ActivityIndicator size={30} color="#fff" />
                </RegularButton>}
                    
            {!isLoading &&
            <RegularButton            
                    btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 15}}
                    textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                    onPress={handSendData}>
                    Gravar
            </RegularButton>}

            </StyledScrollView>

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

export default Perfil;