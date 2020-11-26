/* eslint-disable react/prop-types */
import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
    children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
    // com o ...rest pego todas as props do RectButonProps, como por exemplo: onPress
    <Container {...rest}>
        <ButtonText>{children}</ButtonText>
    </Container>
);

export default Button;
