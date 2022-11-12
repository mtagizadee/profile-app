import { useRef, MouseEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteUser, updateUser } from "../api";
import Layout from "../components/layout/Layout";
import Input from "../components/ui/Input";
import { replaceEmptyInputValue } from "../helpers";
import { useAppDispatch } from "../redux/hooks";
import { setMessage, show } from "../redux/slices/alertSlice";
import { EmailValidatorInstance, ERROR } from "../validators";
import LogoutIcon from "../components/icons/LogoutIcon";
import Modal from "../components/Modal";
import { logOut } from "../redux/slices/authSlice";
import { NavigateFunction, useNavigate } from "react-router";
import { AxiosError } from "axios";

const ProfileEditPage = () => {
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [logoutModal, setLogoutModal] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const deleteAccount = async () => {
        try {
            navigate('/');
            await deleteUser();
            dispatch(show());
            dispatch(setMessage('Successfully deleted an account navigating to login page...'));
            dispatch(logOut())
        } catch (error) {
            dispatch(show());

            if (error instanceof AxiosError && error.response?.status == 401) {
                dispatch(logOut());
                setMessage('Seems like your session is expred. Please procceed authentication again');
                return;
            }

            setMessage('Could not delete the account.');
        }
    }

    const onLogoutClick = () => {
        dispatch(logOut())
        dispatch(show());
        dispatch(setMessage('Log out. Navigating to login page...'));
        navigate('/');
    }

    return (
        <>
            <Modal visible={deleteModal} onClose={() => setDeleteModal(false)}>
                <div className='bg-white p-6 rounded'>
                    <div className='pb-3 text-center text-xl'> Are you sure? </div>
                    <div className='flex items-center gap-6'>
                        <button onClick={deleteAccount}> Yes </button>
                        <button onClick={() => setDeleteModal(false)}> No </button>
                    </div>
                </div>
            </Modal>
            <Modal visible={logoutModal} onClose={() => setLogoutModal(false)}>
                <div className='bg-white p-6 rounded'>
                    <div className='pb-3 text-center text-xl'> Are you sure? </div>
                    <div className='flex items-center gap-6'>
                        <button onClick={onLogoutClick}> Yes </button>
                        <button onClick={() => setLogoutModal(false)}> No </button>
                    </div>
                </div>
            </Modal>
            <Layout>
                <div>
                    <UpdateUserForm />
                    <div className="flex items-center justify-between mt-6">
                        <button onClick={() => setDeleteModal(true)}> Delete account </button>
                        <div onClick={() => setLogoutModal(true)} className="flex items-center cursor-pointer">
                            <span> Log out </span>
                            <LogoutIcon color="black" scale="0.6" />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

const UpdateUserForm = () => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const firstNameRef = useRef<any>();
    const secondNameRef = useRef<any>();
    const emailRef = useRef<any>();
    const passwordRef = useRef<any>();

    const updateProfileMutation = useMutation(updateUser, {
        onSuccess: variables => {
            queryClient.setQueryData('current-user', variables);
            dispatch(show())
            dispatch(setMessage('Successfully updated the account'));
        },
        onError: (error) => {
            dispatch(show());

            if (error instanceof AxiosError && error.response?.status == 401) {
                dispatch(logOut());
                dispatch(setMessage('Seems like your session is expred. Please procceed authentication again'));
                return;
            }


            dispatch(setMessage('Could not update profile information'));
        }
    })

    const onSubmit = async (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (emailRef.current[ERROR]) return;

        updateProfileMutation.mutate({
            email: replaceEmptyInputValue(emailRef.current.value),
            password: replaceEmptyInputValue(passwordRef.current.value),
            firstName: replaceEmptyInputValue(firstNameRef.current.value),
            secondName: replaceEmptyInputValue(secondNameRef.current.value)
        })
    }

    return (
        <div>
            <h1 className="text-xl p-6 font-bold"> Edit profile information </h1>
            <form onSubmit={onSubmit}>
                <div className="sm:grid grid-cols-2 gap-6">
                    <div>
                        <Input
                            placeholder="First name"
                            innerRef={firstNameRef}
                        />
                        <Input
                            placeholder="Second name"
                            className="my-3"
                            innerRef={secondNameRef}
                        />
                    </div>
                    <div>
                        <Input
                            placeholder="Email"
                            innerRef={emailRef}
                            validators={[EmailValidatorInstance]}
                        />
                        <Input
                            placeholder="Password"
                            className="my-3"
                            innerRef={passwordRef}
                        />
                    </div>
                </div>
                <input type="submit" value="Edit" className="cursor-pointer" />
            </form>
        </div>
    )
}

export default ProfileEditPage;