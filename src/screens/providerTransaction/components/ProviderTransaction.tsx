import React from 'react';
import ScreenHead from '../../../components/Head/ScreenHead';
import MessageAlertModal from '../../../components/Modals/MessageAlertModal';
import Payments from '../../../components/Payments/Payments';
import { Container } from '../../../components/Shared';
import { cleanData, useAppData } from '../../../services';
import { ScreensProps, TPayments, TschedulingData } from '../../../types/AppType';
import { fetchConsultaPagamentos } from '../service';

const ProviderTransaction: React.FC<ScreensProps> = ({navigation})  => {
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    const [data, setData] = React.useState<Array<TPayments> | null>([]);

    const [visible, setVisible] = React.useState(false);
    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [messageModal, setMessageModal] = React.useState('');
    const [type, setType] = React.useState("erro");

    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() =>{
        loadData();
    },[]);

    const loadData = async () => {
        setLoading(true);
        const {primaryColor:strPrimaryColor, secondColor: strSecondColor, userId, appKey} = await useAppData();
        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 
  
        //carrega dados da api
        var reponse = await fetchConsultaPagamentos({userId,  appId: appKey}); 
        if (reponse){
            const {sucessful, data, message} = reponse;
            if (sucessful){
                setData(data);               
                setLoading(false);
            }
        }
        else{
            setLoading(false);
            showModal("Segurança", "suas credênciais expiraram, precisamos que você efetue novamente seu login.", "erro");
            cleanData();
        }
    };
      

    const modalButtonHandle = () =>{
        setVisible(false);
        navigation.navigate("SignIn");
    }

    const showModal = (headText: string, message: string, type: string)=> {
        setMessageHeadding(headText);
        setMessageModal(message);
        setType(type);
        setVisible(true);
    }


    return (
          <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                screenName="Transações" 
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true} 
                onPress={() => navigation.navigate("Menu")} 
                showRightIcon={true} 
                RightIconName="sync" 
                onRightPress={() => loadData()}
                />
            <Payments refreshing={isLoading} onRefresh={loadData}  data={data as Array<TPayments>} primaryColor={primaryColor} secondColor={secondColor}/>                   

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

export default ProviderTransaction;