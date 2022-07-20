import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import RegularButton from "../../../components/Buttons/RegularButton";
import ScreenHead from "../../../components/Head/ScreenHead";
import DocumentoInput from "../../../components/Input/DocumentoInput";

import { Container, StyledScrollView } from "../../../components/Shared";
import { useAppData } from "../../../services";
import { ScreensProps } from "../../../types/AppType";

import * as ImagePicker from 'react-native-image-picker';
import { ActivityIndicator, PermissionsAndroid } from "react-native";
import { fetchDocumento } from "../services";

const Documentos: React.FC<ScreensProps> = ({navigation}) =>{
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    const [isLoading, setLoading] = React.useState(false);


    const [identidadeStatus, setIdentidadeStatus] = React.useState(false);
    const [enderecoStatus, setEnderecoStatus] = React.useState(false);
    const [antecendeteCriminalStatus, setAntecendeteCriminalStatus] = React.useState(false);
    const [setfilStatus, setSelfieStatus] = React.useState(false);
    const [validaDocumento, setValidaDocumento] = React.useState("false");

    const [DocumentoIdentidade, setDocumentoIdentidade] = React.useState<string>("");
    const [DocumentoEndereco, setDocumentoEndereco] =  React.useState<string>("");
    const [DocumentoAntecedente, setDocumentoAntecedente] =  React.useState<string>("");
    const [DocumentoSefie, setDocumentoSefie] =  React.useState<string>("");


    React.useEffect(() =>{        
        loadData();
    },[]);

    const loadData = async () => {
        const {primaryColor:strPrimaryColor, secondColor: strSecondColor } = await useAppData();
        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 

        const validaDocumento = await AsyncStorage.getItem("validaDocumento");
        setValidaDocumento(validaDocumento ? validaDocumento: "false");

    };

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
                await ImagePicker.launchCamera({mediaType: 'photo', saveToPhotos: true, quality: 0.5, cameraType:'back'}, (data) =>{

                    if (data.assets){
                        setDocumentoIdentidade(data.assets[0].uri as string);
                        setIdentidadeStatus(true);
                    }

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
                await ImagePicker.launchCamera({mediaType: 'photo', saveToPhotos: true, quality: 0.5, cameraType:'back'}, (data) =>{
                    if (data.assets){
                        setDocumentoEndereco(data.assets[0].uri as string);
                        setEnderecoStatus(true);
                    }
                    console.log(data);
                });
            } else {
            console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    const takePictureAntecedente = async () => {
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
                await ImagePicker.launchCamera({mediaType: 'photo', saveToPhotos: true, quality: 0.5, cameraType:'back'}, (data) =>{
                    if (data.assets){
                        setDocumentoAntecedente(data.assets[0].uri as string);
                        setAntecendeteCriminalStatus(true);
                    }
                    console.log(data);
                });
            } else {
            console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    const takePictureSelfie = async () => {
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
                await ImagePicker.launchCamera({mediaType: 'photo', saveToPhotos: true, quality: 0.5, cameraType:'back'}, (data) =>{
                    if (data.assets){
                        setDocumentoSefie(data.assets[0].uri as string);
                        setSelfieStatus(true);
                    }
                    console.log(data);
                });
            } else {
            console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    const handleSendDocumento = async () => {
        setLoading(true);
        const { userId, appKey: appId, Latitude, Longitude } = await useAppData();
        const {sucessful, data, message} = await fetchDocumento({userId, appId, DocumentoIdentidade, DocumentoEndereco, DocumentoAntecedente, DocumentoSefie, Latitude, Longitude});
        
        console.log(message);

        if (sucessful){
            navigation.reset({
                index: 1,
                routes: [
                  { name: 'ValidandoDocumentos' },
                ],
              })
        }
        setLoading(false);
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
                        onPress={handleSendDocumento}>
                        Enviar
                </RegularButton>}

             </StyledScrollView>
            

        </Container>
    );
}

export default Documentos;