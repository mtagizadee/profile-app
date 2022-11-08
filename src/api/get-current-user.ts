import axios from "axios";
import { User, IUser } from "../types";
import { API_BASE_URL } from "./config";

const getCurrentUser = async () => {
    const url = API_BASE_URL + '/users/current-user';
    const response = await axios.get<IUser>(url);
    return new User(response.data);
}

export default getCurrentUser;