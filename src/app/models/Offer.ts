import { Product } from "./Product";

export class Offer {
	id: number | null;
	idUser: number;
	product: Product;
	isActive: boolean;
	isDeleted: boolean;

	constructor(id: number | null, idUser: number, product: Product, isActive: boolean, isDeleted: boolean) {
		this.id = id;
		this.idUser = idUser;
		this.product = product;
		this.isActive = isActive;
		this.isDeleted = isDeleted;
	}
}