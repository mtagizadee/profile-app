import { Validator } from ".";

export class RequiredValidator<T> implements Validator<T> {
    private defaultValue;

    constructor(defaultValue: T) {
        this.defaultValue = defaultValue;
    }

    getErrorMessage(): string {
        return 'This field should not be empty...';
    }

    validate = (value: T): boolean => value !== this.defaultValue;
}