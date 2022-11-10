import axios from 'axios';
import { API_BASE_URL } from './config';

type TDeleteImageParams = {
    id: number;
}

export const deleteImage = async ({ id }: TDeleteImageParams) => {
    const url = API_BASE_URL + '/images/' + id;
    const response = await axios.delete(url);
    return response.data;
}
