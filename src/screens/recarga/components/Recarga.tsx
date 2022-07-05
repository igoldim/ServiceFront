import React from "react";
import ImageButton from "../../../components/Buttons/ImageButton";
import RegularButton from "../../../components/Buttons/RegularButton";
import ScreenHead from "../../../components/Head/ScreenHead";
import RegularInput from "../../../components/Input/RegularInput";
import { Row } from "../../../components/Shared";
import BigText from "../../../components/Texts/BigText";
import { useAppData } from "../../../services";
import { ScreensProps } from "../../../types/AppType";
import { Container } from "./Recarga.s";

const Recarga: React.FC<ScreensProps> = ({navigation}) =>{
    const [primaryColor, setPrimaryColor] = React.useState("#000");
    const [secondColor, setSecondColor] = React.useState("#000");
    const [formaPagamento, setFormaPagamento] = React.useState("D");

    React.useEffect(() =>{
    
        const loadData = async () => {
        const {primaryColor:strPrimaryColor, secondColor: strSecondColor } = await useAppData();

        setPrimaryColor(strPrimaryColor); 
        setSecondColor(strSecondColor); 
        };
        
        loadData();

    },[]);

    return (
        <Container style={{backgroundColor: primaryColor}}>
            <ScreenHead 
                screenName="Recarga"  
                onPress={() => navigation.navigate("Menu")}
                primaryColor={primaryColor} 
                secondColor={secondColor} 
                showIcon={true} />

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
                ViewStyles={{marginTop: 25}}
            />

            <BigText>Forma de Pagamento</BigText>

            {formaPagamento === "D" &&
            <Row>
                <ImageButton 
                    btnStyles={{backgroundColor:  secondColor, width: '45%', borderRadius: 5}}
                    textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                    ImageViewName='attach-money'
                    ImageViewColor={secondColor}
                    ImageViewStyles={{backgroundColor:  primaryColor}}
                    onPress={() => setFormaPagamento("D")}>
                        Pix
                </ImageButton>
                <ImageButton 
                    btnStyles={{backgroundColor:  primaryColor, width: '45%', borderTopWidth: 1,  borderLeftWidth: 1,  borderRightWidth: 1,  borderBottomWidth: 1,  borderColor: secondColor}}
                    textStyles={{color: secondColor, fontSize: 24, fontWeight: '500'}}
                    ImageViewName='payment'
                    ImageViewColor={primaryColor}
                    ImageViewStyles={{backgroundColor:  secondColor}}
                    onPress={() => setFormaPagamento("C")}
                    disabled={true}>
                        Cartão
                </ImageButton>
            </Row> 
            }
            {formaPagamento === "C" &&
            <Row>              
                <ImageButton 
                    btnStyles={{backgroundColor:  primaryColor, width: '45%', borderTopWidth: 1,  borderLeftWidth: 1,  borderRightWidth: 1,  borderBottomWidth: 1,  borderColor: secondColor}}
                    textStyles={{color: secondColor, fontSize: 24, fontWeight: '500'}}
                    ImageViewName='payment'
                    ImageViewColor={primaryColor}
                    ImageViewStyles={{backgroundColor:  secondColor}}
                    onPress={() => setFormaPagamento("D")}>
                        Pix
                </ImageButton>
                <ImageButton 
                    btnStyles={{backgroundColor:  secondColor, width: '45%', borderRadius: 5}}
                    textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                    ImageViewName='attach-money'
                    ImageViewColor={secondColor}
                    ImageViewStyles={{backgroundColor:  primaryColor}}
                    onPress={() => setFormaPagamento("C")}
                    disabled={true}>
                        Cartão
                </ImageButton>
            </Row> 
            }
             <RegularButton 
                btnStyles={{borderColor: primaryColor, borderTopWidth: 1,  borderLeftWidth: 1,  borderRightWidth: 1,  borderBottomWidth: 1 ,backgroundColor: secondColor, marginTop: 30}}
                textStyles={{color: primaryColor, fontSize: 24, fontWeight: '500'}}
                onPress={() => navigation.navigate("RecargaPagarPix")}>
                    Pagar
            </RegularButton>
        </Container>
    );
}

export default Recarga;