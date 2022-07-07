import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../Colors';
import BigText from '../Texts/BigText';
import RegularText from '../Texts/RegularText';
import { GestureResponderEvent, Image, Modal, StyleProp, TextInput, TextStyle, ViewStyle } from "react-native";

import RegularButton from '../Buttons/RegularButton';
import { Row } from '../Shared';

import ScreenHead from '../Head/ScreenHead';
import Stars from '../Stars';
import { TServices} from '../../types/AppType';
import RegularInputArea from '../Input/RegularInputArea';
import MessageModal from './MessageModal';

const ModalPressableContainer = styled.Pressable`
    flex: 1;
    padding: 10px;
    justify-content: center;
    align-items: center;
`;

const ModalView = styled.ScrollView`
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    height: 100%;
    /*elavation: 5;
    shadow-color: ${Colors.Black};
    shadown-offset: 0px 2px;
    shadownOpacity: 0.25;
    shadown-radius: 4px;*/
`;

const ModalHead = styled.View`
    flex-direction: row;
    justify-content: space-between;
    background-color: ${Colors.Background};
    width: 100%;
    height: 60px;
    padding: 10px;
    align-items: center;
`;

export const StyledImage = styled.Image`
    resize-mode: cover;
    width: 100%;
    height: 100%;
    border-radius: 10px;    
`;

interface ButtonProps{
    item : TServices;
    btnStyles?: StyleProp<ViewStyle>;
    onPress?:() => void;
    textStyles?: StyleProp<TextStyle>;
    children?: React.ReactNode;
    visible?:boolean | undefined;
    heading?: string | undefined;
    message?: string | undefined;
    onPressTransaction?: ((event:GestureResponderEvent) => void | undefined);
    primaryColor: string;
    secondColor: string;
}
const ModalScheduling: React.FC<ButtonProps> = (props) => {
    const [visibleMessage, setVisibleMessage] = React.useState(false);
    const [messageModal, setMessageModal] = React.useState(''); //Email Validado com sucesso!
    const [messageType, setMessageType] = React.useState('');
    const [messageHeadding, setMessageHeadding] = React.useState('');
    const [modalButtonText, setmodalButtonText] = React.useState('');     
    const [status, setStatus] = React.useState('');     
    const [startValue, setStarValue] = React.useState(0);

    const [viewComment, serViewComment] = React.useState(false);
    const handleSetStarValue = (value : number) => {

    };

    const showModal = (type: string, message: string, headText: string, buttonLabel: string) => {
        setMessageType(type);
        setMessageModal(message);
        setMessageHeadding(headText);
        setmodalButtonText(buttonLabel);
        setVisibleMessage(true);
    }

    const modalButtonHandle = () =>{
        setVisibleMessage(false);
        if (messageType === "success") {
            serViewComment(true);
        }
    }

    const modalMessageHandle = () =>{
        setVisibleMessage(false);
        showModal("success", "Serviço concluído com sucesso!", "Obrigado", "Concluir");
        setStatus("Concluído");
    }

    const modalMessageHandleCancel = () =>{
        setVisibleMessage(false);
        serViewComment(false)
        showModal("cancel", "Serviço cancelado com sucesso!", "Obrigado", "Fechar");
        setStatus("Cancelado");
    }

    const handleSetSatrValue = (newValue : number) =>{
        setStarValue(startValue !== newValue ? newValue : 0);
    };

    return(<>
            <Modal
                animationType='slide'
                visible={props.visible!}>
                <ModalPressableContainer style={{backgroundColor: props.primaryColor}}>
                    <ModalView style={{backgroundColor: props.secondColor}}>
                        <ScreenHead screenName='Agendamento' showIcon={true} onPress={props.onPress} primaryColor={props.secondColor} secondColor={props.primaryColor}/>
                        {!viewComment && status === "" &&
                        <Row>
                            <RegularButton 
                                btnStyles={{backgroundColor:  props.primaryColor, width: '45%', borderRadius: 5, display: 'flex', justifyContent:'center', alignItems: 'center'}}
                                textStyles={{color: props.secondColor, fontSize: 24, fontWeight: '500'}}
                                onPress={modalMessageHandle}>
                                    Concluído
                            </RegularButton>

                            <RegularButton 
                                btnStyles={{width: '45%', borderColor: props.primaryColor, borderTopWidth: 1,  borderLeftWidth: 1,  borderRightWidth: 1,  borderBottomWidth: 1 ,backgroundColor: props.secondColor}}
                                textStyles={{color: props.primaryColor, fontSize: 24, fontWeight: '500'}}
                                onPress={modalMessageHandleCancel}>
                                    Cancelar
                            </RegularButton>

                        </Row>
                        }
                        {status !== "" && 
                        <Row style={{marginTop: 10}}>
                            <BigText textStyles={{fontSize: 25, color: props.primaryColor, fontWeight: '800'}} >Status: {status}</BigText>
                        </Row>
                    
                        }
                        <Row style={{marginTop: 10}}>
                            <RegularText textStyles={{fontSize: 25, color: props.primaryColor, fontWeight: '800'}} >Data</RegularText>
                            <RegularText textStyles={{fontSize: 25, color: props.primaryColor, fontWeight: '800'}} >Hora</RegularText>
                        </Row>
                        <Row>
                            <RegularText textStyles={{fontSize: 18, color: props.primaryColor}} > {props.item.schedule && props.item.schedule.scheduleDateTime?.split("T")[0]}</RegularText>
                            <RegularText textStyles={{fontSize: 18, color: props.primaryColor}} > {props.item.schedule && props.item.schedule.scheduleDateTime?.split("T")[1]}</RegularText>
                        </Row>
                        <Row style={{width: '100%'}}>
                            <BigText textStyles={{textAlign: 'left', fontSize: 20, color: props.primaryColor, marginVertical: 2, fontWeight: 'bold'}} >Cliente</BigText>
                            <BigText textStyles={{textAlign: 'left', fontSize: 20, color: props.primaryColor, marginVertical: 2, fontWeight: 'bold'}} >Valor</BigText>
                        </Row>
                        <Row style={{width: '100%'}}>
                            { props.item.user && 
                                <RegularText textStyles={{fontSize: 16, color: props.primaryColor}} >{ props.item.user.name}</RegularText>
                            }
                           
                           {props.item.proffisional && 
                                <RegularText textStyles={{fontSize: 16, color: props.primaryColor}} >{props.item.proffisional.name.split(' ')[0] + ' ' + props.item.proffisional.name.split(' ')[props.item.proffisional.name.split(' ').length-1]}</RegularText>
                            }
                            <RegularText textStyles={{fontSize: 16, color: props.primaryColor}} >{props.item.amountValue && (props.item.amountValue).toFixed(2).toString()}</RegularText>
                        </Row>
                        <Row style={{width: '100%'}}>
                            <BigText textStyles={{fontSize: 20, color: props.primaryColor, marginVertical: 2, fontWeight: 'bold'}} >Endereço</BigText>
                        </Row>
                        <Row style={{width: '100%'}}>
                            {props.item.user && 
                                <BigText textStyles={{fontSize: 16, color: props.primaryColor}} >{props.item.user.address}</BigText>
                            }
                            {props.item.proffisional && 
                                <BigText textStyles={{fontSize: 16, color: props.primaryColor}} >{props.item.proffisional.address}</BigText>
                            }
                        </Row>
                        <Row style={{width: '100%'}}>
                            {props.item.user && 
                                <BigText textStyles={{fontSize: 16, color: props.primaryColor}} >{props.item.user.district}</BigText>
                            }
                            {props.item.proffisional && 
                                <BigText textStyles={{fontSize: 16, color: props.primaryColor}} >{props.item.proffisional.district}</BigText>
                            }
                        </Row>
                        <Row style={{width: '100%'}}>
                            {props.item.user && 
                                <BigText textStyles={{fontSize: 16, color: props.primaryColor}} >{props.item.user.complement}</BigText>
                            }
                            {props.item.proffisional && 
                                <BigText textStyles={{fontSize: 16, color: props.primaryColor}} >{props.item.proffisional.complement}</BigText>
                            }
                        </Row>
                        <Row style={{width: '100%'}}>
                            {props.item.user && 
                                <BigText textStyles={{fontSize: 16, color: props.primaryColor}} >{props.item.user.city}{" / " + props.item.user.state}</BigText>
                            }
                            {props.item.proffisional && 
                                <BigText textStyles={{fontSize: 16, color: props.primaryColor}} >{props.item.proffisional.city}{" / " + props.item.proffisional.state}</BigText>
                            }
                        </Row>
                        {props.item.user  &&
                        <>
                            <Row style={{width: '100%'}}>
                                <BigText textStyles={{fontSize: 20, color: props.primaryColor, marginVertical: 10, fontWeight: 'bold'}} >Localização</BigText>
                            </Row>
                            <Row style={{width: '100%', backgroundColor: props.secondColor, height: 200,  borderRadius: 10, marginBottom: 10}}>
                                <StyledImage source={{uri: 'https://imagens.circuit.inf.br/maps.jpeg'}} />
                            </Row>
                            {status === "" &&  
                            <RegularButton 
                                    btnStyles={{alignSelf: 'center', backgroundColor:  props.secondColor, width: '45%', borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center', marginBottom: 20}}
                                    textStyles={{color: props.secondColor, fontSize: 24, fontWeight: '500'}}
                                    onPress={props.onPress}>
                                        Rota
                            </RegularButton>
                            }
                        </>
                        }
                        {props.item.proffisional && viewComment &&
                        <>
                            <Row style={{width: '100%'}}>
                                <BigText textStyles={{fontSize: 20, color: props.primaryColor, marginVertical: 10, fontWeight: 'bold'}} >Comentário</BigText>
                            </Row>
                            <RegularInputArea
                                ViewStyles={{borderColor: props.primaryColor, borderTopWidth: 1,  borderLeftWidth: 1,   borderRadius: 5, borderRightWidth: 1,  borderBottomWidth: 1 ,backgroundColor: props.secondColor}}
                                inputStyles={{textAlignVertical: 'top'}}
                                multiline={true}
                                maxLength={50}
                                numberOfLines={4}
                            />
                            <Stars isSave={true} onPress={(e) => handleSetSatrValue(e)}  value={startValue} showNumber={false} width="40" height='40' startStyle={{marginTop: 10, marginBottom: 10, alignSelf: 'center'}}/>
                            <RegularButton 
                                    btnStyles={{alignSelf: 'center', backgroundColor:  props.primaryColor, width: '45%', borderRadius: 5, padding: 10, display: 'flex', justifyContent:'center', alignItems: 'center', marginBottom: 20}}
                                    textStyles={{color: props.secondColor, fontSize: 24, fontWeight: '500'}}
                                    onPress={props.onPress}>
                                        Salvar
                            </RegularButton>
                        </>
                        }
                    </ModalView>
                </ModalPressableContainer>
                {props.children}
            </Modal>
            <MessageModal
                primaryColor={props.primaryColor} 
                secondColor={props.secondColor} 
                viewStyles={{backgroundColor: props.secondColor}}
                visible={visibleMessage} 
                setVisible={setVisibleMessage} 
                heading={messageHeadding} 
                message={messageModal} 
                btnTitle={modalButtonText} 
                type={messageType}
                onPress={modalButtonHandle}
            />
        </>
    );
};

export default ModalScheduling;