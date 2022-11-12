import axios from "axios";
import { User } from "../types";
import { API_BASE_URL } from "./config"

export const getUser = async (id: string) => {
    const url = API_BASE_URL + '/users/single-user/' + id;
    const response = await axios.get(url);
    return new User(response.data);
}