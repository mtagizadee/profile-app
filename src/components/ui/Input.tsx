import { ChangeEvent, useState } from 'react';
import { ERROR, Validator } from '../../validators';
import ErrorMark from './ErrorMark';

interface Props<T> {
    type?: string;
    innerRef: any;
    required?: boolean;
    className?: string;
    placeholder: string;
    validators?: Validator<T>[];
}

function Input<T>({ innerRef, required = false, type = 'text', placeholder, className, validators = [] }: Props<T>) {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(!required);

    const validate = (value: T) => {
        if (validators.length != 0) {
            validators.forEach((validator: Validator<T>) => {
                const validated = validator.validate(value);
                setError(validated);
                if (!validated) {
                    setErrorMessage(validator.getErrorMessage());
                }
            })
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as T;
        validate(value);
    }

    return (
        <div className={`w-full ${className} relative`}>
            <input
                type={type}
                ref={innerRef}
                placeholder={placeholder}
                className={`w-full border-2 ${error ? 'border-black' : 'border-main placeholder-main'}  outline-none rounded py-2 px-4`}
                onChange={onChange}
            />
            {!error ? <ErrorMark errorMessage={errorMessage} /> : null}
        </div>
    );
}

export default Input;