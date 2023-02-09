export class AttributeValue {
	idProduct: number;
	idAttribute: number;
	attributeName: string;
	valueValue: string

	constructor(idProduct: number, idAttribute: number, attributeName: string, valueValue: string) {
		this.idProduct = idProduct;
		this.idAttribute = idAttribute;
		this.attributeName = attributeName;
		this.valueValue = valueValue;
	}
}