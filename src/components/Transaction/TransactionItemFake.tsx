import React from 'react';
import { View } from 'react-native';
import { useAppData } from '../../services';
import RegularText from '../Texts/RegularText';
import TransactionAvi from './TransactionAvi';
import { LeftRow, TransactionRow } from './TransactionItem.s';

const TransactionItemFake: React.FC = ( props ) => {
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    React.useEffect(() =>{
    
        const loadData = async () => {
            const {primaryColor:strPrimaryColor, secondColor: strSecondColor} = await useAppData();
            setPrimaryColor(strPrimaryColor); 
            setSecondColor(strSecondColor); 
        };
        
        loadData();

    },[]);
    return (
        <View style={{alignSelf: 'center', flexDirection:'row', justifyContent: 'center', padding: 30}}>
        <RegularText textStyles={{
                color: secondColor,
                textAlign: 'left',
                marginBottom: 5,
                fontWeight:'800'                    
            }}>
                Sem dados
            </RegularText>
        </View>
);
}

export default TransactionItemFake;
