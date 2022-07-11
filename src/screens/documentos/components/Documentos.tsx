import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import RegularButton from "../../../components/Buttons/RegularButton";
import ScreenHead from "../../../components/Head/ScreenHead";
import DocumentoInput from "../../../components/Input/DocumentoInput";

import { Container, StyledScrollView } from "../../../components/Shared";
import { useAppData } from "../../../services";
import { ScreensProps } from "../../../types/AppType";

import * as ImagePicker from 'react-native-image-picker';
import { PermissionsAndroid } from "react-native";

const Documentos: React.FC<ScreensProps> = ({navigation}) =>{
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");


    const [identidadeStatus, setIdentidadeStatus] = React.useState(false);
    const [enderecoStatus, setEnderecoStatus] = React.useState(false);
    const [antecendeteCriminalStatus, setAntecendeteCriminalStatus] = React.useState(false);
    const [setfilStatus, setSelfieStatus] = React.useState(false);
    const [validaDocumento, setValidaDocumento] = React.useState("false");


    const [type, setType] = React.useState<"front" | "back" | undefined>("back");


    React.useEffect(() =>{
    
        const loadData = async () => {
        const {primaryColor:strPrimaryColor, secondColor: strSecondColor } = await useAppData();
        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 

        const validaDocumento = await AsyncStorage.getItem("validaDocumento");
        setValidaDocumento(validaDocumento ? validaDocumento: "false");

        };
        
        loadData();

    },[]);


    const takePictureIdentidade = async () => {
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

            if (granted === PermissionsAndroid.RESULTS.GRANTED && grantedstorage ===  PermissionsAndroid.RESULTS.GRANTED) {
                await ImagePicker.launchCamera({mediaType: 'photo', saveToPhotos: true, quality: 1, cameraType:'back'}, (data) =>{
                    console.log(data);
                });
            } else {
            console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    const takePictureEndereco = async () => {
        await ImagePicker.launchCamera({mediaType: 'photo', saveToPhotos: true, quality: 1, cameraType:'back'}, (data) =>{
            console.log(data);
        });
    }

    const takePictureAntecedente = async () => {
        await ImagePicker.launchCamera({mediaType: 'photo', saveToPhotos: true, quality: 1, cameraType:'back'}, (data) =>{
            console.log(data);
        });
    }

    const takePictureSelfie = async () => {
        await ImagePicker.launchCamera({mediaType: 'photo', saveToPhotos: true, quality: 1, cameraType:'back'}, (data) =>{
            console.log(data);
        });
    }

    return (
        <Container style={{backgroundColor: primaryColor}}>
             <ScreenHead 
                screenName="Documentação"  
                onPress={() => validaDocumento != "true" ? navigation.navigate("Perfil") : navigation.navigate("SignIn")}
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true}/>
             <StyledScrollView>

             <DocumentoInput 
                    iconeName={identidadeStatus ? "check-circle" : "radio-button-unchecked"}
                    iconeColor={primaryColor}
                    title='Comprovante Identidade'
                    placeholder= {identidadeStatus ? "uploaded" : "no uploaded"} 
                    editable={false}             
                    placeholderColor={primaryColor}
                    titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                    inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800'}}
                    ViewStyles={{marginTop: 10}}
                    iconStyles={{borderColor: primaryColor}}
                    ShowMenu={true}
                    onPressMenu={takePictureIdentidade}
                />
                
                <DocumentoInput 
                    iconeName={enderecoStatus ? "check-circle" : "radio-button-unchecked"}
                    iconeColor={primaryColor}
                    title='Comprovante Endereço'
                    placeholder= {enderecoStatus ? "uploaded" : "no uploaded"} 
                    editable={false}             
                    placeholderColor={primaryColor}
                    titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                    inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800'}}
                    ViewStyles={{marginTop: 10}}
                    iconStyles={{borderColor: primaryColor}}
                    ShowMenu={true}
                    onPressMenu={takePictureEndereco}
                />

                <DocumentoInput 
                    iconeName={antecendeteCriminalStatus ? "check-circle" : "radio-button-unchecked"}
                    iconeColor={primaryColor}
                    title='Antecendente Criminal'
                    placeholder= {antecendeteCriminalStatus ? "uploaded" : "no uploaded"} 
                    editable={false}             
                    placeholderColor={primaryColor}
                    titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                    inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800'}}
                    ViewStyles={{marginTop: 10}}
                    iconStyles={{borderColor: primaryColor}}
                    ShowMenu={true}
                    onPressMenu={takePictureAntecedente}
                />
                <DocumentoInput 
                    iconeName={setfilStatus ? "check-circle" : "radio-button-unchecked"}
                    iconeColor={primaryColor}
                    title='Self com Doc. de Identidade'
                    placeholder= {setfilStatus ? "uploaded" : "no uploaded"} 
                    editable={false}             
                    placeholderColor={primaryColor}
                    titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                    inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800'}}
                    ViewStyles={{marginTop: 10}}
                    iconStyles={{borderColor: primaryColor}}
                    ShowMenu={true}
                    onPressMenu={takePictureSelfie}
                />

                <RegularButton            
                        btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 15}}
                        textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                        onPress={() => {}}>
                        Enviar
                </RegularButton>
             </StyledScrollView>
            

        </Container>
    );
}

export default Documentos;