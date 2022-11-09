import { createContext, useContext, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { API_BASE_URL } from '../api';
import getCurrentUser from '../api/get-current-user';
import Layout from '../components/layout/Layout';
import Loader from '../components/Loader';
import { User } from '../types';
import Error from '../components/Error';
import CameraIcon from '../components/icons/CameraIcon';
import { updateImage } from '../api/updateImage';
import { createHeader } from '../api/createHeader';
import { useAppDispatch } from '../redux/hooks';
import { setMessage, show } from '../redux/slices/alertSlice';
import FileInput from '../components/FileInput';
import useHover from '../hooks/useHover';

type TUserContext = {
    user: User | undefined,
    isModifiable: boolean
} | undefined;
const UserContext = createContext<TUserContext>(undefined);

const ProfilePage = () => {
    const { data, isLoading, isError } = useQuery('current-user', getCurrentUser);
    if (isLoading) return <Loader />
    if (isError) return <Error />

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

const ProfileHeader = () => {
    const dispatch = useAppDispatch();
    const data = useContext(UserContext);
    const header = data?.user?.getHeaderImage();

    const updateMutation = useMutation(updateImage, {
        onSuccess: variables => {
            data?.user?.deleteHeader();
            data?.user?.addHeader(variables as any);
        },
        onError: () => {
            dispatch(show());
            dispatch(setMessage('Could not update your header image...'));
        },
    });
    const createMutation = useMutation(createHeader, {
        onSuccess: variables => {
            data?.user?.addHeader(variables as any);
        },
        onError: () => {
            dispatch(show());
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
    const [hover, onMouseEnter, onMouseLeave] = useHover();
    const data = useContext(UserContext);
    const avatar = data?.user?.getAvatar();

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
                        onSuccess={(file: File) => { console.log(file) }}
                        validatedExtensions={['jpg', 'png', 'jpeg']}
                    >
                        {hover ?
                            <div className='bg-black w-full h-full absolute top-0 rounded-full flex items-center justify-center bg-opacity-30 cursor-pointer'>
                                <CameraIcon color='white' />
                            </div> : null
                        }
                    </FileInput>
                    : null
                }
            </div>
            <span> {data?.user?.getFullName()} </span>
        </div>
    )
}

const ProfileImages = () => {
    const data = useContext(UserContext);
    const images = data?.user?.getImages();

    return (
        <div className='w-full flex justify-center'>
            <div className='w-full max-w-[800px]'>
                <hr className='border-black' />
                <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 p-2'>
                    {images?.length != 0 ?
                        images?.map(image =>
                            <div key={image.getId()} className='w-full flex justify-center items-center'>
                                <div
                                    className='bg-loading bg-cover bg-center w-[250px] h-[250px]'
                                    style={{ backgroundImage: `url(${API_BASE_URL + `/${image.getUrl()}`})` }}
                                />
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;