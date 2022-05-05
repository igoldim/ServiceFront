import React from 'react';
import styled from 'styled-components/native';

const StayledContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center ;
    margin-top: 15px;
`;

const RowContainer: React.FC = (props)  => {
    return (
        <StayledContainer {...props}> 
            {props.children}          
        </StayledContainer>
    );
};  

export default RowContainer;