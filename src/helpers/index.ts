import { ACCESS_TOKEN_KEY } from '../api';

export * from './axios-helpers';

export const replaceEmptyInputValue = (value: string) => {
    if (value != '') return value;
}

export const logout = (callback: () => void) => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    callback();
}