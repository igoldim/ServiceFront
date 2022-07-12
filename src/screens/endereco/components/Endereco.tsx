import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import { ScrollView, View } from "react-native";
import RegularButton from "../../../components/Buttons/RegularButton";
import ScreenHead from "../../../components/Head/ScreenHead";
import EnderecoInput from "../../../components/Input/EnderecoInput";
import MessageAlertModal from "../../../components/Modals/MessageAlertModal";
import { useAppData } from "../../../services";
import { ScreensProps } from "../../../types/AppType";
import { fetchGetPerfil } from "../../perfil/services";
import { fetchCep, fetchEndereco } from "../services";
import { Container } from "./Endereco.s";

const Endereco: React.FC<ScreensProps> = ({navigation}) =>{
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");
    const [userType, setUserType] = React.useState<string>("");
    
    const [zip, setZip] = React.useState<string>("");
    const [address, setAddress] = React.useState<string>("");
    const [number, setNumber] = React.useState<string>("");
    const [complement, setComplement] = React.useState<string>("");
    const [district, setDistrict] = React.useState<string>("");
    const [city, setCity] = React.useState<string>("");
    const [state, setState] = React.useState<string>("");

    const [latitude, setLatitude] = React.useState<string>("");
    const [longitude, setLongitude] = React.useState<string>("");

    const [visible, setVisible] = React.useState(false);
    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [messageModal, setMessageModal] = React.useState('');
    const [type, setType] = React.useState("erro");


    React.useEffect(() =>{
    
    const loadData = async () => {
        const {primaryColor:strPrimaryColor, secondColor: strSecondColor, userId } = await useAppData();
        const UserType = await AsyncStorage.getItem('UserType');
        
        setUserType(UserType as string);
        
        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 

        var { sucessful, data, message } = await fetchGetPerfil(userId); 
        if (sucessful){
            setZip(data?.zip as string);
            setAddress(data?.address as string);
            setNumber(data?.number as string);
            setDistrict(data?.district as string);
            setCity(data?.city as string);
            setState(data?.state as string);
            setComplement(data?.complement as string);
            setLatitude(data?.latitude as string);
            setLongitude(data?.longitude as string);
        }
        };
        
        loadData();

    },[]);

    const showModal = (headText: string, message: string, type: string)=> {
        setMessageHeadding(headText);
        setMessageModal(message);
        setType(type);
        setVisible(true);
    }
  
    const modalButtonHandle = async () =>{
          setVisible(false);
    }

    const handleConsultaCep = async () => {

        const reslult = await fetchCep(zip); 

        if (!reslult?.erro){
            setAddress(reslult?.logradouro as string);
            setDistrict(reslult?.bairro as string);
            setCity(reslult?.localidade as string);
            setState(reslult?.uf as string);
        }
        else{
            showModal("Cep Não localizado.", "Caso esteja correto, preencha os demais campos.", "erro");
        }
    }

    const handleAddress= async () =>{
        try {
  
            //valida dados de entrada
            if (zip === "") {
              showModal("Informe o Cep", "email é obrigatório", "erro");
              return false;
            }
  
            if (address === "") {
                showModal("Informe a Rua", "rua é obrigatório", "erro");
                return false;
            }

            if (district === "") {
                showModal("Informe o Bairro", "bairo é obrigatório", "erro");
                return false;
            }
    
            if (city === "") {
                showModal("Informe a Cidade", "cidade é obrigatório", "erro");
                return false;
            }

            if (state === "") {
                showModal("Informe a UF", "uf é obrigatório", "erro");
                return false;
            }

            //call backend
            const { userId} = await useAppData();
            var { sucessful, message } = await fetchEndereco({userId, zip, address, number, complement, district, city, state, latitude, longitude});       
  
            if (sucessful){
                showModal("Parabéns,", message , "success");               
            }
            else{

            }
        } catch (error) {
          console.log(error);
        } 
    }
  

    return(
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                screenName="Endereço" 
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true} 
                onPress={() => navigation.navigate("Perfil")} />
            <ScrollView>
                <EnderecoInput 
                    iconeName='search' //my-location
                    iconeColor={primaryColor}
                    title='Cep'
                    placeholder="Digite seu cep"
                    maxLength={8}
                    keyboardType={"number-pad"}
                    placeholderColor={primaryColor}
                    titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                    inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800'}}
                    ViewStyles={{marginTop: 10}}
                    iconStyles={{borderColor: primaryColor}}
                    ShowMenu={true}
                    value={zip}
                    onChangeText={setZip}
                    onBlur={handleConsultaCep}
                    onPressMenu={handleConsultaCep}
                />
                <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <EnderecoInput 
                        iconeColor={primaryColor}
                        title='Rua'
                        placeholder="Digite nome da rua"
                        placeholderColor={primaryColor}
                        titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                        inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800', paddingRight: 10}}
                        ViewStyles={{marginTop: 10, width:'75%'}}
                        iconStyles={{borderColor: primaryColor}}
                        ShowMenu={false}
                        value={address}
                        onChangeText={setAddress}
                        />

                    <EnderecoInput 
                        iconeColor={primaryColor}
                        title='Número'
                        placeholder="Nº"
                        placeholderColor={primaryColor}
                        titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                        inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800', paddingRight: 10}}
                        ViewStyles={{marginTop: 10, width:'24%'}}
                        iconStyles={{borderColor: primaryColor}}
                        ShowMenu={false}
                        value={number}
                        onChangeText={setNumber}
                    />
                </View>
                <EnderecoInput 
                        iconeColor={primaryColor}
                        title='Bairro'
                        placeholder="Digite nome do bairro"
                        placeholderColor={primaryColor}
                        titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                        inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800', paddingRight: 10}}
                        ViewStyles={{marginTop: 10}}
                        iconStyles={{borderColor: primaryColor}}
                        ShowMenu={false}
                        value={district}
                        onChangeText={setDistrict}
                    />
                <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <EnderecoInput 
                        iconeColor={primaryColor}
                        title='Cidade'
                        placeholder="Digite nome da cidade"
                        placeholderColor={primaryColor}
                        titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                        inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800', paddingRight: 10}}
                        ViewStyles={{marginTop: 10, width:'75%'}}
                        iconStyles={{borderColor: primaryColor}}
                        ShowMenu={false}
                        value={city}
                        onChangeText={setCity}
                    />

                    <EnderecoInput 
                        iconeColor={primaryColor}
                        title='UF'
                        placeholder="UF"
                        maxLength={2}
                        placeholderColor={primaryColor}
                        titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                        inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800', paddingRight: 10}}
                        ViewStyles={{marginTop: 10, width:'24%'}}
                        iconStyles={{borderColor: primaryColor}}
                        ShowMenu={false}
                        value={state}
                        onChangeText={setState}
                    />
                </View>
                <EnderecoInput 
                        iconeColor={primaryColor}
                        title='Complemento'
                        placeholder="Digite aqui o complemento"
                        placeholderColor={primaryColor}
                        titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                        inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 16, fontWeight: '800', paddingRight: 10}}
                        ViewStyles={{marginTop: 10, marginBottom:20}}
                        iconStyles={{borderColor: primaryColor}}
                        ShowMenu={false}
                        value={complement}
                        onChangeText={setComplement}
                    />
                 <RegularButton            
                    btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center'}}
                    textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                    onPress={handleAddress}>
                    Gravar
                </RegularButton>
            </ScrollView>

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

export default Endereco;