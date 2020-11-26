/* eslint-disable react/prop-types */
import React, {
    useEffect,
    useState,
    useCallback,
    useRef,
    useImperativeHandle,
    forwardRef,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface InputValureReference {
    value: string;
}

interface InputRef {
    focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
    { name, icon, ...rest },
    ref,
) => {
    const inputElementRef = useRef<any>(null);
    const { registerField, defaultValue = '', fieldName, error } = useField(
        name,
    );
    const inputValueRef = useRef<InputValureReference>({ value: defaultValue });

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        setIsFilled(!!inputValueRef.current.value);
    }, []);

    useImperativeHandle(ref, () => ({
        focus() {
            inputElementRef.current.focus();
        },
    }));

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value) {
                inputValueRef.current.value = value;
                // o inpuetElementRef será responsável por mudar visualmente o texto que o user irá digitar dentro do input pois o component n está refletindo de forma automárica esse valor
                inputElementRef.current.setNativeProps({ text: value });
            },
            clearValue() {
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            },
        });
    }, [fieldName, registerField]);

    return (
        <Container isFocused={isFocused} isWrong={!!error}>
            <Icon
                name={icon}
                size={20}
                color={isFocused || isFilled ? '#cee7f0' : '#666360'}
            />

            <TextInput
                ref={inputElementRef}
                keyboardAppearance="dark"
                // pegando o texto que o usuário digitou e preenchendo dentro da variável value que foi criada
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                placeholderTextColor="#666360"
                onChangeText={value => {
                    inputValueRef.current.value = value;
                }}
                {...rest}
            />
        </Container>
    );
};

export default forwardRef(Input);
