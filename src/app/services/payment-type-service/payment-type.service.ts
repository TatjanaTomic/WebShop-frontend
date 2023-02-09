import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentType } from 'src/app/models/PaymentType';

@Injectable({
	providedIn: 'root'
})
export class PaymentTypeService {

	private baseUrl: string;

	constructor(private http: HttpClient) {
		this.baseUrl = 'http://localhost:9000/api/v1/payment-types';
	}

	public findAll() {
		return this.http.get<PaymentType[]>(this.baseUrl);
	}
}
