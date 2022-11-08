import { FC } from 'react';
import { NavigateFunction, useNavigate } from 'react-router';
import { API_BASE_URL } from '../api';


interface Props {
    imageUrl?: string;
    navigateTo: string;
}

const ProfileIcon: FC<Props> = ({ imageUrl, navigateTo }) => {
    const navigate: NavigateFunction = useNavigate();

    return (
        <div
            onClick={() => navigate(navigateTo)}
            className='w-[70px] h-[70px] bg-loading bg-cover bg-center bg-no-repeat rounded-full hover:cursor-pointer'
            style={{ backgroundImage: `url(${API_BASE_URL + `/${imageUrl}`})` }}
        />
    );
}

export default ProfileIcon;