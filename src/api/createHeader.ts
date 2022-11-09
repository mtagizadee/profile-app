import axios from 'axios';
import FormData from 'form-data';
import { API_BASE_URL } from './config';

type CreateHeaderParams = {
    header: File
}

export const createHeader = async ({ header }: CreateHeaderParams) => {
    const url = API_BASE_URL + '/images/header';

    const formData = new FormData();
    formData.append('header', header);

    const response = await axios.post(url, formData);
    return response.data;
} 