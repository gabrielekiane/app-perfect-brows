import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    width: 100%;
    height: 60px;
    margin-top: 8px;
    background: #f7d9ce;
    border-radius: 10px;

    justify-content: center;
    align-items: center;
`;

export const ButtonText = styled.Text`
    font-family: 'Raleway-Medium';
    color: #312e38;
    font-size: 18px;
`;
