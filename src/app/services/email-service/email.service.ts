import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mail } from 'src/app/models/Mail.js';

@Injectable({
	providedIn: 'root'
})
export class EmailService {

	private mailUrl = ""

	constructor(private http: HttpClient) {
		this.mailUrl = 'http://localhost:9000/api/v1/email';
	}

	public send(mail: Mail) {
		return this.http.post<Mail>(this.mailUrl, mail);
	}
}
