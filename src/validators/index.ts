export * from './email-validator';
export * from './required-validator';

export const ERROR = 'ERROR_OCCURED';

export interface Validator<T> {
    validate(value: T): boolean;
    getErrorMessage(): string;
}