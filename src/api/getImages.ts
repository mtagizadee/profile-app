import axios from "axios";
import { IImage, Image } from "../types";
import { API_BASE_URL } from "./config";

const getImages = async () => {
    const url = API_BASE_URL + '/images?type=image';
    const response = await axios.get<IImage[]>(url);
    return response.data.map(image => new Image(image));
}

export default getImages;