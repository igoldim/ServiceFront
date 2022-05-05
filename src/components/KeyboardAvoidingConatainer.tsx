import React from 'react';
import { KeyboardAvoidingView, Keyboard, Pressable, ScrollView, Platform, GestureResponderEvent } from 'react-native';


interface InputProps{
    children: React.ReactNode;
}



const KeyboardAvoidingConatainer: React.FC<InputProps> = (props)  => {
    return (
        <KeyboardAvoidingView
            style={{flex: 1, backgroundColor: 'transparent', width: '90%'}}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={60}
        >      
        <ScrollView showsVerticalScrollIndicator={false}>
            <Pressable onPress={Keyboard.dismiss}>
            {props.children}
            </Pressable>
        </ScrollView>
        </KeyboardAvoidingView>
    );
};  

export default KeyboardAvoidingConatainer;