import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from 'src/app/models/Message';

@Injectable({
	providedIn: 'root'
})
export class MessageService {

	private baseUrl: string;

	constructor(private http: HttpClient) {
		this.baseUrl = 'http://localhost:9000/api/v1/messages';
	}

	public insert(message: Message) {
		return this.http.post<Message>(this.baseUrl, message);
	}
}
