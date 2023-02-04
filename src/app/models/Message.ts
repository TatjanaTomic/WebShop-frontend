export class Message {
    id: null = null;
    content: string;
    idUser: number | null;
    isRead: boolean = false;
    dateTime: string | null;

    constructor(content: string, idUser: number|null, dateTime: string|null) {
        this.content = content;
        this.idUser = idUser;
        this.dateTime = dateTime;
    }
}