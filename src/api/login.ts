import axios from "axios";
import { API_BASE_URL } from "./config"

interface ILoginUserData {
    email: string;
    password: string;
}

export type AccessToken = { access_token: string }

export const login = async (data: ILoginUserData) => {
    const url = API_BASE_URL + '/auth/login';
    const response = await axios.post<AccessToken>(url, data);
    return response.data;
}