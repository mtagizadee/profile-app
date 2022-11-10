import axios from 'axios';
import FormData from 'form-data';
import { API_BASE_URL } from './config';

type TCreateAvatarParams = {
    avatar: File
}

export const createAvatar = async ({ avatar }: TCreateAvatarParams) => {
    const url = API_BASE_URL + '/images/avatar';

    const formData = new FormData();
    formData.append('avatar', avatar);

    const response = await axios.post(url, formData);
    return response.data;
} 