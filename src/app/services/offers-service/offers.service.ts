import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Offer } from 'src/app/models/Offer';

@Injectable({
	providedIn: 'root'
})
export class OffersService {

	private baseUrl: string;

	private dataSource = new BehaviorSubject<any>({});
	public offer = this.dataSource.asObservable();

	constructor(private http: HttpClient) {
		this.baseUrl = 'http://localhost:9000/api/v1/offers';
	}

	setOffer(o: Offer) {
		this.dataSource.next(o);
	}

	public findAll() {
		return this.http.get<Offer[]>(this.baseUrl + '/existing');
	}

	public findByProductName(content: string) {
		return this.http.get<Offer[]>(this.baseUrl + '/product/' + content);
	}

	public findByCategoryId(id: number) {
		return this.http.get<Offer[]>(this.baseUrl + '/idCategory/' + id);
	}

	public findByUserId(id: number) {
		return this.http.get<Offer[]>(this.baseUrl + '/idUser/' + id);
	}

	public updateOffer(offer: Offer) {
		return this.http.put<Offer>(this.baseUrl + '/' + offer.id, offer);
	}

	public insert(offer: Offer) {
		return this.http.post<Offer>(this.baseUrl, offer);
	}
}
