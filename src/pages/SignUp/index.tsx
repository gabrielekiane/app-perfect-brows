/* eslint-disable no-unused-expressions */
import React, { useRef, useCallback } from 'react';
import {
    View,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    TextInput,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import {
    Container,
    Title,
    BackToSignIn,
    BackToSignInText,
    Icon,
} from './styles';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const emailInpurRef = useRef<TextInput>(null);
    const passwordInpurRef = useRef<TextInput>(null);
    const navigation = useNavigation();

    const handleSignUp = useCallback(
        async (data: SignUpFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    name: Yup.string().required(
                        'You need to fill in this field',
                    ),
                    email: Yup.string()
                        .required('E-mail is required')
                        .email('Enter a valid e-mail'),
                    password: Yup.string().min(
                        6,
                        'Password at least six digits',
                    ),
                });

                await schema.validate(data, { abortEarly: false });

                await api.post('/users', data);

                Alert.alert(
                    'Successful registration',
                    'ow you can logon on Perfect Brows!',
                );

                navigation.goBack();
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);

                    return;
                }

                Alert.alert(
                    'An error happened in the registration!',
                    'Unable to register, try again.',
                );
            }
        },
        [navigation],
    );

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex: 1 }}
                >
                    <Container>
                        <Image source={logoImg} />

                        {/* colocando a view ao redor do texto para que ele faça a animação de subir e descer corretamente - animação ocasionanda pelo keyboardAvoidView */}
                        <View>
                            <Title>Create your account</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSignUp}>
                            <Input
                                autoCapitalize="words"
                                name="name"
                                icon="user"
                                placeholder="Name"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    emailInpurRef.current.focus();
                                }}
                            />
                            <Input
                                autoCorrect={false}
                                ref={emailInpurRef}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInpurRef.current.focus();
                                }}
                            />
                            <Input
                                name="password"
                                ref={passwordInpurRef}
                                icon="lock"
                                placeholder="Password"
                                secureTextEntry
                                returnKeyType="send"
                                textContentType="newPassword"
                            />
                        </Form>

                        <Button
                            onPress={() => {
                                formRef.current?.submitForm();
                            }}
                        >
                            Sign Up
                        </Button>
                    </Container>
                </ScrollView>

                <BackToSignIn
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Icon name="arrow-left" size={20} color="#cee7f0" />
                    <BackToSignInText>Back to logon</BackToSignInText>
                </BackToSignIn>
            </KeyboardAvoidingView>
        </>
    );
};

export default SignUp;
