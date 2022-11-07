import { Image } from "./image";

export interface IUser {
    id: string;
    firstName: string;
    secondName: string;
    email: string;
    images: Image[];
}

export class User {
    private data: IUser;

    constructor(data: IUser) {
        this.data = data;
    }

    getFullName = () => `${this.data.firstName} ${this.data.secondName}`

    getImages = () => this.data.images;

    getId = () => this.data.id;
}