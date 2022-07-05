import React from 'react';
import ScreenHead from '../../../components/Head/ScreenHead';
import { Container } from '../../../components/Shared';
import { useAppData } from '../../../services';
import { ScreensProps } from '../../../types/AppType';

const Template: React.FC<ScreensProps> = ({navigation})  => {
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");

    React.useEffect(() =>{
    
    const loadData = async () => {
      const {primaryColor:strPrimaryColor, secondColor: strSecondColor } = await useAppData();
      setPrimaryColor(strPrimaryColor); 
      setSecondColor(strSecondColor); 

      //carrega dados da api
    };
    
    loadData();
  },[]);

    return (
          <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                screenName="Template" 
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true} 
                onPress={() => navigation.navigate("Menu")} />
            
        </Container>
    );
};  

export default Template;