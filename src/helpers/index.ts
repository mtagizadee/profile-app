export * from './axios-helpers';

export const replaceEmptyInputValue = (value: string) => {
    if (value != '') return value;
}