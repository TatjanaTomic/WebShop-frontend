import { Category } from "./Category";
import { Image } from "./Image";

export class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    isNew: boolean;
    contact: string;
    category: Category;
    address: string;
    images: Image[];

    constructor(id: number, name: string, description: string, price: number, isNew: boolean,
        contact: string, category: Category, address: string, images: Image[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.isNew = isNew;
        this.contact = contact;
        this.category = category;
        this.address = address;
        this.images = images;
    }
}