import { Product } from "./Product";

export class ImageRequest {
    id: number|null;
    url: string;
    product: Product;

    constructor(id: number|null, url: string, product: Product) {
        this.id = id;
        this.url = url;
        this.product = product;
    }
}