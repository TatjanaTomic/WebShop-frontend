export class Value {
	idProduct: number;
	idAttribute: number;
	idCategory: number;
	value: string;

	constructor(idProduct: number, idAttribute: number, idCategory: number, value: string) {
		this.idProduct = idProduct;
		this.idAttribute = idAttribute;
		this.idCategory = idCategory;
		this.value = value;
	}
}