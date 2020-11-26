/* eslint-disable no-unused-expressions */
import React, { useCallback, useRef } from 'react';
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

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';

import logoImg from '../../assets/logo.png';

import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
    Container,
    Title,
    ForgotPassword,
    ForgotPasswordText,
    CreateAccountButton,
    CreateAccountButtonText,
    Icon,
} from './styles';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    // smp criamos a ref qnd queremos queremos manipular um evento de forma direta, e não esperando algum evento acontecer
    // quero realizar o submit assim que o botão for clicado
    const formRef = useRef<FormHandles>(null);
    const passwordInpurRef = useRef<TextInput>(null);
    const navigation = useNavigation();

    const { signIn } = useAuth();

    const handleSignIn = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail is required')
                        .email('Enter a valid e-mail'),
                    password: Yup.string().required('Password is required'),
                });

                await schema.validate(data, { abortEarly: false });

                /* history.push('/dashboard'); */

                await signIn({
                    email: data.email,
                    password: data.password,
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);

                    return;
                }

                Alert.alert(
                    'An error happened!',
                    'Unable to login, try again.',
                );
            }
        },
        [signIn],
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
                            <Title>Sign In</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSignIn}>
                            <Input
                                autoCorrect={false}
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
                                onSubmitEditing={() => {
                                    formRef.current.submitForm();
                                }}
                            />
                        </Form>

                        <Button
                            onPress={() => {
                                formRef.current.submitForm();
                            }}
                        >
                            Sign In
                        </Button>

                        <ForgotPassword
                            onPress={() => {
                                console.log('foi');
                            }}
                        >
                            <ForgotPasswordText>
                                Forgot my password
                            </ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>

                <CreateAccountButton
                    onPress={() => {
                        navigation.navigate('SignUp');
                    }}
                >
                    <Icon name="log-in" size={20} color="#cee7f0" />
                    <CreateAccountButtonText>
                        Create account
                    </CreateAccountButtonText>
                </CreateAccountButton>
            </KeyboardAvoidingView>
        </>
    );
};

export default SignIn;
