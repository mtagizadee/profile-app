import { API_BASE_URL } from "./config"
import axios from 'axios';
import { User } from "../types";

type TUpdateUserData = {
    email?: string;
    password?: string;
    firstName?: string;
    secondName?: string;
}

export const updateUser = async (data: TUpdateUserData) => {
    const url = API_BASE_URL + '/users';
    const response = await axios.patch(url, data);
    return new User(response.data);
}