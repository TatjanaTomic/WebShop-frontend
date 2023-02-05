export class Image {
    id: number;
    url: string;
    idProduct: string;

    constructor(id: number, url: string, idProduct: string) {
        this.id = id;
        this.url = url;
        this.idProduct = idProduct;
    }
}