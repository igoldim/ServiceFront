import React from 'react';
import CardSection from '../../../components/Cards/CardSection';
import { HomeContainer } from './Home.s';
import { HomeProps } from './Home.t';
import avatar from '../../../assets/images/avatar.png';
import TransactionSection from '../../../components/Transaction/TransactionSection';

const Home: React.FC<HomeProps> = ({navigation}) => {
    const cardData = [
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af097",
            userName: "Igor Goldim",
            userAddress: "Rua Gabriel Junqueira, 00",
            userAddressDistrict: "Serra Dourada 3 Etapa",
            userAddressCity: "Aparecida de Goainia",
            userAddressState: "GO",
            userAddressComplement: "QD 55 LT 22 Casa 01",
            scheduleDate: "07/05/2022", // ==> pegar dia da semana (Sabádo)
            scheduleTime: "08:00",
            userImage: avatar
        },
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af080",
            userName: "Augusto Oliveria",
            userAddress: "Rua A, 00",
            userAddressDistrict: "Etapa da Serra",
            userAddressCity: "Desaparecida de Goainia",
            userAddressState: "GO",
            userAddressComplement: "QD 01 LT 55 Casa 22",
            scheduleDate: "08/05/2022", // ==> pegar dia da semana (Domingo)
            scheduleTime: "07:00",
            userImage: avatar
        },
        {
            id: "2cb32ade-ac5d-40b5-bf25-b135c85af001",
            userName: "Amanda Reys",
            userAddress: "Rua Sem Nome, 99",
            userAddressDistrict: "Dourada Serra",
            userAddressCity: "Goainia de Aparecida",
            userAddressState: "GO",
            userAddressComplement: "QD 22 LT 55 Casa 02",
            scheduleDate: "09/05/2022", // ==> pegar dia da semana (Segunda)
            scheduleTime: "08:00",
            userImage: avatar
        },
    ];
    return (
        <>           
            <HomeContainer>
               <CardSection data={cardData} />
               <TransactionSection data={[]}/>
            </HomeContainer>
        </>
    );
};  

export default Home;