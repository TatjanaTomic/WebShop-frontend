import { Offer } from "./Offer";
import { User } from "./User";

export class MyComment {
	id: number | null;
	content: string;
	userAccount: User;
	offer: Offer;

	constructor(id: number | null, content: string, userAccount: User, offer: Offer) {
		this.id = id;
		this.content = content;
		this.userAccount = userAccount;
		this.offer = offer;
	}
}