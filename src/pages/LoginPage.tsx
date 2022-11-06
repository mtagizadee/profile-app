import { useRef, MouseEvent } from 'react';
import Logo from "../components/Logo";
import Input from "../components/ui/Input";
import PageLink from '../components/ui/PageLink';

const LoginPage = () => {
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    const onSubmit = (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={onSubmit} id="auth-form">
                <fieldset>
                    <legend> Log in </legend>
                    <Logo clickable={false} className='mb-6' />
                    <Input
                        innerRef={emailRef}
                        type='email'
                        required={true}
                        placeholder="Email"
                    />
                    <Input
                        innerRef={passwordRef}
                        type='password'
                        required={true}
                        placeholder="Password"
                        className='my-6'
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