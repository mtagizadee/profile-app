import { Validator } from ".";

export class EmailValidator implements Validator<string> {
    validate(value: string): boolean {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const validated = value.toLowerCase().match(regex);

        return validated !== null;
    }

    getErrorMessage(): string {
        return 'Email is not valid...';
    }
}