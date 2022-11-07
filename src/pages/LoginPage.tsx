import { useRef, MouseEvent, useState } from 'react';
import Logo from "../components/Logo";
import Input from "../components/ui/Input";
import PageLink from '../components/ui/PageLink';
import { EmailValidatorInstance, ERROR, RequiredValidatorInstance } from '../validators';
import { setIsAuth } from '../redux/slices/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { login } from '../api';
import { AxiosError } from 'axios';
import ErrorMessage from '../components/ui/ErrorMessage';
import { setMessage, show } from '../redux/slices/alertSlice';

const LoginPage = () => {
    const [error, setError] = useState<number>(0);
    const emailRef = useRef<any>();
    const passwordRef = useRef<any>();
    const dispatch = useAppDispatch();

    const onSubmit = async (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (emailRef.current[ERROR] || passwordRef.current[ERROR]) return;
        try {
            const accessToken = await login({
                email: emailRef.current.value,
                password: passwordRef.current.value
            });

            dispatch(setIsAuth(true));
            localStorage.setItem('access_token', accessToken.access_token);
            setError(0);
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
                    {error == 404 ? <ErrorMessage> User with entered email does not exist </ErrorMessage> : null}
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
                    {error == 403 ? <ErrorMessage> Entered password is wrong </ErrorMessage> : null}
                    <input
                        type='submit'
                        value='Log in'
                        className='hover:cursor-pointer mt-6'
                    />
                    <span>
                        Do not have an account?
                        <PageLink to='/signup' className='font-bold text-main'> Sign up! </PageLink>
                    </span>
                </fieldset>
            </form>
        </div>
    );
}

export default LoginPage;