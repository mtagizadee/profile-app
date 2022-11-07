import axios from 'axios'
import { API_BASE_URL } from './config'

interface ICreateUserData {
    email: string;
    password: string;
    firstName: string;
    secondName: string;
}

export const signup = async (data: ICreateUserData) => {
    const url = API_BASE_URL + '/auth/signup';
    const response = await axios.post(url, data);
    return response.data;
}