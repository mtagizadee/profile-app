import { useQuery } from 'react-query';
import { API_BASE_URL } from '../api';
import getCurrentUser from '../api/get-current-user';
import Layout from '../components/layout/Layout';
import Loader from '../components/Loader';

const ProfilePage = () => {
    const { data, isLoading, isFetching, isError, error } = useQuery('current-user', getCurrentUser);
    if (isLoading) return <Loader />
    const header = data?.getHeaderImage()?.getUrl();
    const avatar = data?.getAvatar()?.getUrl();
    const images = data?.getImages();

    return (
        <Layout>
            <div
                className='w-full h-[60vh] bg-loading bg-cover bg-center'
                style={{ backgroundImage: `url(${API_BASE_URL + `/${header}`})` }}
            />
            <div className='flex items-center gap-12 text-xl font-bold'>
                <div
                    className='w-full h-screen max-w-[140px] min-w-[120px] max-h-[140px] min-h-[120px] relative bottom-12 left-12 bg-loading rounded-full bg-cover bg-center'
                    style={{ backgroundImage: `url(${API_BASE_URL + `/${avatar}`})` }}
                />
                <span> {data?.getFullName()} </span>
            </div>
            <div className='w-full flex justify-center'>
                <div className='w-full max-w-[800px]'>
                    <hr className='border-black' />
                    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 p-2'>
                        {images?.map(image =>
                            <div className='w-full flex justify-center items-center'>
                                <div
                                    className='bg-loading bg-cover bg-center w-[250px] h-[250px]'
                                    style={{ backgroundImage: `url(${API_BASE_URL + `/${image.getUrl()}`})` }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProfilePage;