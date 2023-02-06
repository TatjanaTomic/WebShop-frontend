import { PaymentType } from "./PaymentType";
import { Offer } from "./Offer";
import { User } from "./User";

export class Purchase {
    id: number|null;
    dateTime: string|null;
    cardNumber: string|null;
    paymentType: PaymentType;
    offer: Offer;
    userAccount: User;

    constructor(id: number|null, dateTime: string, cardNumber: string|null, paymentType: PaymentType, offer: Offer, userAccount: User) {
        this.id = id;
        this.dateTime = dateTime;
        this.cardNumber = cardNumber;
        this.paymentType = paymentType;
        this.offer = offer;
        this.userAccount = userAccount;
    }
}