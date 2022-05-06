import React from 'react';
import { StyledView, StyledImage } from './Profile.s';
import { ProfileProps } from './Profile.t';
import RegularText from '../Texts/RegularText';
import SmallText from '../Texts/SmallText';
import { Colors } from '../Colors';

const Profile: React.FC<ProfileProps> = ( props ) => {
    return (
        <StyledView onPress={props.onPress} style={props.imageContainerStyle}>         
           <StyledImage  style={props.imageStyle} source={props.img}/>
        </StyledView>
    );
};  

export default Profile;