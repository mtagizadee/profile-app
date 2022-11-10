import { API_BASE_URL } from "./config";
import FormData from 'form-data';
import axios from 'axios';

type TCreateImageParams = {
    image: File;
}

export const createImage = async ({ image }: TCreateImageParams) => {
    const url = API_BASE_URL + '/images/image';

    const formData = new FormData();
    formData.append('image', image);

    const response = await axios.post(url, formData);
    return response.data;
}