export class Mail {
	receiver: string;
	content: string;

	constructor(receiver: string, content: string) {
		this.receiver = receiver;
		this.content = content;
	}
}