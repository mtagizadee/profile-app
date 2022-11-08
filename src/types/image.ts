export type ImageType = 'header' | 'avatar' | 'image';

export interface IImage {
    id: number;
    url: string;
    type: ImageType;
}

export class Image {
    private data: IImage;

    constructor(data: IImage) {
        this.data = data;
    }

    getUrl() {
        return this.data.url;
    }

    getId() {
        return this.data.id;
    }

    getType() {
        return this.data.type;
    }
}