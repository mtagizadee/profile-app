import axios from 'axios';
import { API_BASE_URL } from './config';

export const deleteUser = async () => {
    const url = API_BASE_URL + '/users';
    const response = await axios.delete(url);
    return response.data;
}