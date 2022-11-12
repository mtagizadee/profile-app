import { FC } from 'react';
import { API_BASE_URL } from '../api';
import { Image } from '../types';
import PageLink from './ui/PageLink';

interface Props {
    image: Image;
}

const UserPost: FC<Props> = ({ image }) => {
    const author = image.getUser();

    return (
        <div className='mb-3'>
            <div className='border-b-2 mb-2 border-black p-3'>
                <PageLink className='font-bold' to={`/users/${author?.id}`}> {author?.firstName + ' ' + author?.secondName} </PageLink>
            </div>
            <div
                className='w-full min-h-[600px] bg-cover bg-center border-2 border-gray-300'
                style={{ backgroundImage: `url(${API_BASE_URL + `/${image.getUrl()}`})` }}
            />
        </div>
    );
}

export default UserPost;