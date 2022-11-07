import { useState, useRef, MouseEvent } from "react";
import { useAppDispatch } from "../redux/hooks";
import { AxiosError } from "axios";
import { EmailValidatorInstance, ERROR, RequiredValidatorInstance } from "../validators";
import { show, setMessage } from "../redux/slices/alertSlice";
import Logo from "../components/Logo";
import ErrorMessage from "../components/ui/ErrorMessage";
import Input from "../components/ui/Input";
import PageLink from "../components/ui/PageLink";
import { signup } from "../api";
import { NavigateFunction, useNavigate } from "react-router";

const SignupPage = () => {
    const [error, setError] = useState<number>(0);
    const emailRef = useRef<any>();
    const passwordRef = useRef<any>();
    const confirmedPasswordRef = useRef<any>();
    const firstNameRef = useRef<any>();
    const secondNameRef = useRef<any>();
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const onSubmit = async (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            emailRef.current[ERROR] || passwordRef.current[ERROR] ||
            firstNameRef.current[ERROR] || secondNameRef.current[ERROR]
        ) return;

        const password = passwordRef.current.value;
        const confirmedPassword = confirmedPasswordRef.current.value;

        if (password !== confirmedPassword) {
            setError(901);
            return;
        }

        try {
            await signup({
                email: emailRef.current.value,
                password,
                firstName: firstNameRef.current.value,
                secondName: secondNameRef.current.value
            });

            dispatch(show())
            dispatch(setMessage('Successfully signed up!'));
            setError(0);
            navigate('/');
        } catch (error) {
            if (error instanceof AxiosError) {
                const status = error.response?.status;

                if (status) {
                    setError(status)
                    return;
                }
            }

            dispatch(show());
            dispatch(setMessage('Something went wrong...'));
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={onSubmit} id="auth-form">
                <fieldset>
                    <legend> Log in </legend>
                    <Logo clickable={false} className='mb-6' />
                    <Input<string>
                        innerRef={firstNameRef}
                        type='text'
                        placeholder="First name"
                        className='mt-6'
                        validators={[RequiredValidatorInstance]}
                        required={true}
                    />
                    <Input<string>
                        innerRef={secondNameRef}
                        type='text'
                        placeholder="Second name"
                        className='my-6'
                        validators={[RequiredValidatorInstance]}
                        required={true}
                    />
                    {error == 409 ? <ErrorMessage> User with entered email already exist </ErrorMessage> : null}
                    <Input<string>
                        innerRef={emailRef}
                        placeholder="Email"
                        required={true}
                        validators={[RequiredValidatorInstance, EmailValidatorInstance]}
                    />
                    <Input<string>
                        innerRef={passwordRef}
                        type='password'
                        placeholder="Password"
                        className='mt-6'
                        validators={[RequiredValidatorInstance]}
                        required={true}
                    />
                    <Input<string>
                        innerRef={confirmedPasswordRef}
                        type='password'
                        placeholder="Confirm password"
                        className='mt-6'
                        validators={[RequiredValidatorInstance]}
                        required={true}
                    />
                    {error == 901 ? <ErrorMessage> Password and confirmed password are not matching </ErrorMessage> : null}

                    <input
                        type='submit'
                        value='Sign up'
                        className='hover:cursor-pointer mt-6'
                    />
                    <span>
                        Already have an account?
                        <PageLink to='/' className='font-bold text-main'> Log in! </PageLink>
                    </span>
                </fieldset>
            </form>
        </div>
    )
}

export default SignupPage;