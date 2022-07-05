import React from "react";
import RegularButton from "../../../components/Buttons/RegularButton";
import ScreenHead from "../../../components/Head/ScreenHead";
import RegularInput from "../../../components/Input/RegularInput";
import StyledList from "../../../components/Lists/StyledList";
import { useAppData } from "../../../services";
import { TAgenda, ScreensProps } from "../../../types/AppType";
import { Container } from "./Agenda.s";

const Agenda: React.FC<ScreensProps> = ({navigation}) =>{
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

    const agendaData : Array<TAgenda> = [
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af097",
            scheduleDate: "07/05/2022", // ==> pegar dia da semana (Sabádo)
            scheduleTime: "08:00",
            amount: "100,00",
            status: "A"
        },
        {
            id: "2cb32ade-ac5d-50b5-bf25-b135c85af097",
            scheduleDate: "08/05/2022", // ==> pegar dia da semana (Sabádo)
            scheduleTime: "08:00",
            amount: "90,00",
            status: "A"
        },
        {
            id: "2cb32ade-ac5d-50b5-bf25-sdcdc85af097",
            scheduleDate: "08/05/2022", // ==> pegar dia da semana (Sabádo)
            scheduleTime: "08:00",
            amount: "90,00",
            status: "A"
        },
    ];


    const handleNew = () => {
        alert(`Novo`);
    }

    const handleEdit = (value: string) => {
        alert(`Editar ${value}`);
    }

    const handleDelete = (value: string) => {
        alert(`Deletar ${value}`);
    }

    const handleGravar = () => {
        alert(`Gravado com sucesso`);
    }

    return (
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                screenName="Agenda"  
                onPress={() => navigation.navigate("Menu")}
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true}
                showRightIcon={true} 
                RightIconName="clock-plus-outline" 
                onRightPress={handleNew}/>


            <RegularInput 
                iconeName='calendar'
                iconeColor={primaryColor}
                title='Data'
                placeholder="00/00/0000"
                placeholderColor={primaryColor}
                titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 20, fontWeight: '600'}}
                ViewStyles={{marginTop: 20}}
                iconStyles={{borderColor: primaryColor}}    
            />
            <RegularInput 
                iconeName='clock'
                iconeColor={primaryColor}
                title='Hora'
                placeholder="00:00"
                placeholderColor={primaryColor}
                titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 20, fontWeight: '600'}}
                ViewStyles={{marginTop: 10}}
                iconStyles={{borderColor: primaryColor}}    
            />

            <RegularInput 
                iconeName='currency-usd'
                iconeColor={primaryColor}
                title='Valor'
                placeholder="0,00"
                placeholderColor={primaryColor}
                titleStyle={{color: secondColor, fontSize: 18, fontWeight: '800'}}
                inputStyles={{backgroundColor: secondColor, color: primaryColor, fontSize: 20, fontWeight: '600'}}
                ViewStyles={{marginTop: 10, marginBottom: 10}}
                iconStyles={{borderColor: primaryColor}}
                    />
            <RegularButton            
                    btnStyles={{backgroundColor: secondColor, borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center'}}
                    textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                    onPress={handleGravar}>
                    Gravar
            </RegularButton>
            <StyledList 
                style={{marginTop: 15}}
                data={agendaData} 
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                onPressEdit={handleEdit}
                onPressDelete={handleDelete}
                />
        </Container>
    );
}

export default Agenda;