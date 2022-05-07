import React from 'react';
import { StyledView, StyledImage } from './Profile.s';
import { ProfileProps } from './Profile.t';

const Profile: React.FC<ProfileProps> = ( props ) => {
    return (
        <StyledView onPress={props.onPress} style={props.imageContainerStyle}>         
           <StyledImage  style={props.imageStyle} source={props.img}/>
        </StyledView>
    );
};  

export default Profile;