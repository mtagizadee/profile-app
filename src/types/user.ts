import { IImage, Image } from "./image";

export interface IUser {
    id: string;
    firstName: string;
    secondName: string;
    email: string;
    images: IImage[];
}

export class User {
    private data: {
        id: string,
        firstName: string,
        secondName: string,
        email: string,
        images: Image[]
    };

    constructor(data: IUser) {
        const images = data.images.map(image => new Image(image));
        this.data = { ...data, images }
    }

    getFullName() {
        return `${this.data.firstName} ${this.data.secondName}`
    }

    getId() {
        return this.data.id;
    }

    getHeaderImage() {
        const images = this.data.images;
        return images.find(image => image.getType() == 'header');
    }

    getAvatar() {
        const images = this.data.images;
        return images.find(image => image.getType() == 'avatar');
    }

    getImages() {
        const images = this.data.images;
        return images.filter(image => image.getType() == 'image');
    }
}