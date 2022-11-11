import axios, { AxiosError } from "axios";
import { NotFoundException } from "../helpers/exceptions-helpers";
import { User } from "../types";
import { API_BASE_URL } from "./config"

export const getUser = async (id: string) => {
    const url = API_BASE_URL + '/users/single-user/' + id;

    const response = await axios.get(url);
    if (!response) throw NotFoundException();

    return new User(response.data);
}