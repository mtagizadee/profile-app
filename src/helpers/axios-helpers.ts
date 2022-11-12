import axios, { AxiosError } from "axios"
import { ACCESS_TOKEN_KEY } from "../api";

export const addRequestInterceptors = () => {
    return axios.interceptors.request.use(
        config => {
            const token = localStorage.getItem(ACCESS_TOKEN_KEY);
            if (token) {
                if (!config.headers) return config;
                config.headers['Authorization'] = 'Bearer ' + token
            }
            return config;
        },
        error => {
            return Promise.reject(error)
        }
    );
}

export const addResponseInterceptors = (callback: any) => {
    return axios.interceptors.response.use(
        response => response,
        error => {
            if (error instanceof AxiosError) {
                const status = error.response?.status;

                if (status === 401) {
                    callback();
                }
            }
        }
    )
}