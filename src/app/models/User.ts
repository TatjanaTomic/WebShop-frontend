export class User {
	id: number | null;
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	city: string;
	avatar: string | null;
	mail: string;
	pin: string;
	isActivated: boolean;
	isDeleted: boolean;

	constructor(id: number | null, firstName: string, lastName: string, username: string, password: string,
		city: string, avatar: string | null, mail: string, pin: string, isActivated: boolean, isDeleted: boolean) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.password = password;
		this.city = city;
		this.avatar = avatar;
		this.mail = mail;
		this.pin = pin;
		this.isActivated = isActivated;
		this.isDeleted = isDeleted;
	}
}