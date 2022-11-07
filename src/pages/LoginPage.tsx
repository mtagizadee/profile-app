import { useRef, MouseEvent } from 'react';
import Logo from "../components/Logo";
import Input from "../components/ui/Input";
import PageLink from '../components/ui/PageLink';
import { EmailValidator, ERROR, RequiredValidator } from '../validators';

const RequiredValidatorInstance = new RequiredValidator('');

const LoginPage = () => {
    const emailRef = useRef<any>();
    const passwordRef = useRef<any>();

    const onSubmit = (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (emailRef.current[ERROR] || passwordRef.current[ERROR]) return;
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={onSubmit} id="auth-form">
                <fieldset>
                    <legend> Log in </legend>
                    <Logo clickable={false} className='mb-6' />
                    <Input<string>
                        innerRef={emailRef}
                        placeholder="Email"
                        required={true}
                        validators={[RequiredValidatorInstance, new EmailValidator()]}
                    />
                    <Input<string>
                        innerRef={passwordRef}
                        type='password'
                        placeholder="Password"
                        className='my-6'
                        validators={[RequiredValidatorInstance]}
                        required={true}
                    />
                    <input
                        type='submit'
                        value='Log in'
                        className='hover:cursor-pointer'
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