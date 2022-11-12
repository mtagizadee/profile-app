import { createContext, useContext, FC, ReactNode, MouseEvent, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { API_BASE_URL, createAvatar, updateImage, createHeader, getCurrentUser, deleteImage, createImage, getUser } from '../api';
import { Image, User } from '../types';
import { setMessage, show } from '../redux/slices/alertSlice';
import { useAppDispatch } from '../redux/hooks';
import Modal from '../components/Modal';
import SettingsIcon from '../components/icons/SettingsIcon';
import Layout from '../components/layout/Layout';
import Loader from '../components/Loader';
import ErrorOccuredPage from '../components/Error';
import CameraIcon from '../components/icons/CameraIcon';
import FileInput from '../components/FileInput';
import useHover from '../hooks/useHover';
import PageLink from '../components/ui/PageLink';
import { Navigate, useParams } from 'react-router';
import { AxiosError } from 'axios';
import { logOut } from '../redux/slices/authSlice';

type TUserContext = {
    user: User | undefined,
    isModifiable: boolean
} | undefined;
const UserContext = createContext<TUserContext>(undefined);

const ProfilePage = () => {
    const { data, isLoading, isError } = useQuery('current-user', getCurrentUser);
    if (isLoading) return <Loader />
    if (isError) return <ErrorOccuredPage
    />

    return (
        <Layout>
            <UserContext.Provider
                value={{
                    user: data,
                    isModifiable: true
                }}
            >
                <ProfileHeader />
                <ProfileInfo />
                <ProfileImages />
            </UserContext.Provider>
        </Layout>
    );
}

export const OtherUserPage = () => {
    const { id } = useParams();
    const { data, isLoading, error, isError } = useQuery(['user', id], () => getUser(id as string));

    if (isLoading) return <Loader />
    if ((error instanceof AxiosError && error.response?.status == 404) || isError) {
        return <Navigate to='/error' />
    }

    return (
        <Layout>
            <UserContext.Provider
                value={{
                    user: data,
                    isModifiable: false
                }}
            >
                <ProfileHeader />
                <ProfileInfo />
                <ProfileImages />
            </UserContext.Provider>
        </Layout>
    )
}

const ProfileHeader = () => {
    const dispatch = useAppDispatch();
    const data = useContext(UserContext);
    const header = data?.user?.getHeaderImage();

    const updateMutation = useMutation(updateImage, {
        onSuccess: variables => {
            data?.user?.deleteHeader();
            data?.user?.addImage(variables);
        },
        onError: (error) => {
            dispatch(show());

            if (error instanceof AxiosError && error.response?.status == 401) {
                dispatch(logOut());
                dispatch(setMessage('Seems like your session is expred. Please procceed authentication again'));
                return;
            }

            dispatch(setMessage('Could not update your header image...'));
        },
    });
    const createMutation = useMutation(createHeader, {
        onSuccess: variables => {
            data?.user?.addImage(variables);
        },
        onError: (error) => {
            dispatch(show());

            if (error instanceof AxiosError && error.response?.status == 401) {
                dispatch(logOut());
                dispatch(setMessage('Seems like your session is expred. Please procceed authentication again'));
                return;
            }

            dispatch(setMessage('Could not upload your header image...'));
        }
    })

    return (
        <div className='relative'>
            <div
                className='w-full h-[60vh] bg-loading bg-cover bg-center'
                style={header ? { backgroundImage: `url(${API_BASE_URL + `/${header?.getUrl()}`})` } : {}}
            />
            {data?.isModifiable ?
                <FileInput
                    validatedExtensions={['jpg', 'png', 'jpeg']}
                    className='absolute right-3 bottom-3 cursor-pointer'
                    onSuccess={
                        (file: File) => {
                            if (header) {
                                updateMutation.mutate({ image: file, id: header?.getId() })
                                return;
                            }

                            createMutation.mutate({ header: file });
                        }
                    }
                >
                    <CameraIcon
                        color={header ? 'white' : 'black'}
                        scale='0.8'
                    />
                </FileInput>
                : null
            }
        </div>
    )
}

const ProfileInfo = () => {
    const dispatch = useAppDispatch();
    const [hover, onMouseEnter, onMouseLeave] = useHover();
    const data = useContext(UserContext);
    const avatar = data?.user?.getAvatar();

    const updateAvatarMutation = useMutation(updateImage, {
        onSuccess: variables => {
            data?.user?.deleteAvatar()
            data?.user?.addImage(variables);
        },
        onError: (error) => {
            dispatch(show());

            if (error instanceof AxiosError && error.response?.status == 401) {
                dispatch(logOut());
                dispatch(setMessage('Seems like your session is expred. Please procceed authentication again'));
                return;
            }

            dispatch(setMessage('Could not update profile image'));
        }
    });

    const createAvatarMutation = useMutation(createAvatar, {
        onSuccess: variables => {
            data?.user?.addImage(variables);
        },
        onError: (error) => {
            dispatch(show());

            if (error instanceof AxiosError && error.response?.status == 401) {
                dispatch(logOut());
                dispatch(setMessage('Seems like your session is expred. Please procceed authentication again'));
                return;
            }

            dispatch(setMessage('Could not create a profile image'));
        }
    });

    return (
        <div className='flex items-center gap-12 text-xl font-bold'>
            <div
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className='w-full h-screen max-w-[140px] min-w-[120px] max-h-[140px] min-h-[120px] relative bottom-12 left-12 bg-loading rounded-full bg-cover bg-center'
                style={avatar ? { backgroundImage: `url(${API_BASE_URL + `/${avatar?.getUrl()}`})` } : {}}
            >
                {data?.isModifiable ?
                    <FileInput
                        onSuccess={(file: File) => {
                            if (avatar) {
                                updateAvatarMutation.mutate({ image: file, id: avatar.getId() });
                                return;
                            }

                            createAvatarMutation.mutate({ avatar: file });
                        }}
                        validatedExtensions={['jpg', 'png', 'jpeg']}
                    >
                        {hover ?
                            <IconOnImage rounded={true} >
                                <CameraIcon color='white' />
                            </IconOnImage> : null}
                    </FileInput>
                    : null
                }
            </div>
            <div className='flex items-center'>
                <span className='text-[1rem] sm:text-[1.3rem]'> {data?.user?.getFullName()} </span>
                {data?.isModifiable ?
                    <PageLink to='/profile/edit'>
                        <SettingsIcon className='cursor-pointer' color='black' scale='0.6' />
                    </PageLink> : null}
            </div>
        </div>
    )
}

const ProfileImages = () => {
    const data = useContext(UserContext);
    const dispatch = useAppDispatch();
    const images = data?.user?.getImages();

    const mutation = useMutation(createImage, {
        onSuccess: (variables) => {
            data?.user?.addImage(variables);
        },
        onError: (error) => {
            dispatch(show());

            if (error instanceof AxiosError && error.response?.status == 401) {
                dispatch(logOut());
                dispatch(setMessage('Seems like your session is expred. Please procceed authentication again'));
                return;
            }

            dispatch(setMessage('Could not create the image...'));
        }
    })

    return (
        <div className='w-full flex justify-center'>
            <div className='w-full max-w-[800px] relative'>
                <hr className='border-black' />
                {data?.isModifiable ?
                    <FileInput
                        onSuccess={(file: File) => mutation.mutate({ image: file })}
                        validatedExtensions={['jpg', 'png', 'jpeg']}
                    >
                        <button className='absolute right-0 -top-9'> Add Image </button>
                    </FileInput> : null}
                <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 p-2'>
                    {images?.length != 0 ?
                        images?.map(image =>
                            <div key={image.getId()} className='w-full flex justify-center items-center'>
                                <ProfileImage image={image} data={data} />
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}

interface CameraIconProps {
    rounded?: boolean;
    children: ReactNode;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

const IconOnImage: FC<CameraIconProps> = ({ rounded = false, children, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{ borderRadius: rounded ? '50%' : '0' }}
            className='bg-black w-full h-full absolute top-0 flex items-center justify-center bg-opacity-30 cursor-pointer'
        >
            {children}
        </div>
    )
}

interface ProfileImageProps {
    data: TUserContext;
    image: Image;
}

const ProfileImage: FC<ProfileImageProps> = ({ image }) => {
    const data = useContext(UserContext);
    const images = data?.user?.getImages();
    const [hover, onMouseEnter, onMouseLeave] = useHover();
    const [optionModal, setOptionModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const updateMutation = useMutation(updateImage, {
        onSuccess: variables => {
            data?.user?.deleteImage(image);
            data?.user?.addImage(variables);
        },
        onError: (error) => {
            dispatch(show());

            if (error instanceof AxiosError && error.response?.status == 401) {
                dispatch(logOut());
                dispatch(setMessage('Seems like your session is expred. Please procceed authentication again'));
                return;
            }


            dispatch(setMessage('Could not update the image...'));
        }
    });
    const deleteMutation = useMutation(deleteImage, {
        onSuccess: () => {
            data?.user?.deleteImage(image);
            setDeleteModal(false);
        },
        onError: (error) => {
            dispatch(show());

            if (error instanceof AxiosError && error.response?.status == 401) {
                dispatch(logOut());
                dispatch(setMessage('Seems like your session is expred. Please procceed authentication again'));
                return;
            }


            dispatch(setMessage('Could not delete the image'));
        }
    });


    return (
        <>
            <Modal onClose={() => setOptionModal(false)} visible={optionModal}>
                <div className='bg-white p-6 rounded'>
                    <div className='pb-3 text-center text-xl'> Choose an option. </div>
                    <div className='flex items-center gap-6'>
                        <FileInput
                            onSuccess={(file: File) => {
                                setOptionModal(false);
                                updateMutation.mutate({ image: file, id: image.getId() });
                            }}
                            validatedExtensions={['jpg', 'png', 'jpeg']}
                        >
                            <button> Update </button>
                        </FileInput>
                        <button onClick={() => {
                            setOptionModal(false);
                            setDeleteModal(true);
                        }}> Delete </button>
                    </div>
                </div>
            </Modal>
            <Modal onClose={() => setDeleteModal(false)} visible={deleteModal}>
                <div className='bg-white p-6 rounded'>
                    <div className='pb-3 text-center text-xl'> Are you sure? </div>
                    <div className='flex items-center gap-6'>
                        <button onClick={() => deleteMutation.mutate({ id: image.getId() })}> Yes </button>
                        <button onClick={() => setDeleteModal(false)}> No </button>
                    </div>
                </div>
            </Modal>
            <div
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className='bg-loading bg-cover bg-center w-[250px] h-[250px] relative'
                style={{ backgroundImage: `url(${API_BASE_URL + `/${images?.find(elem => elem.getId() == image.getId())?.getUrl()}`})` }}
            >
                {data?.isModifiable ?
                    <>
                        {hover ?
                            <IconOnImage onClick={() => setOptionModal(true)}>
                                <SettingsIcon color="white" />
                            </IconOnImage> : null}
                    </> : null
                }
            </div>
        </>
    )
}

export default ProfilePage;