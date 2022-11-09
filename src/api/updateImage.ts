import { API_BASE_URL } from "./config"
import FormData from 'form-data';
import axios from 'axios';

type UpdateImageParams = {
    id: number,
    image: File
}

export const updateImage = async ({ id, image }: UpdateImageParams) => {
    const url = API_BASE_URL + '/images/' + id;

    const formData = new FormData();
    formData.append('image', image);

    const response = await axios.patch(url, formData);
    return response.data;
}