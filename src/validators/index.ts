import { EmailValidator } from './email-validator';
import { RequiredValidator } from './required-validator';

export * from './email-validator';
export * from './required-validator';

export const ERROR = 'ERROR_OCCURED';

export const RequiredValidatorInstance = new RequiredValidator('');
export const EmailValidatorInstance = new EmailValidator();

export interface Validator<T> {
    validate(value: T): boolean;
    getErrorMessage(): string;
}