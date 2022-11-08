import axios from "axios";
import { User, IUser } from "../types";
import { ACCESS_TOKEN_KEY, API_BASE_URL } from "./config";

const getCurrentUser = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const url = API_BASE_URL + '/users/current-user';
    const response = await axios.get<IUser>(url, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    return new User(response.data);
}

export default getCurrentUser;