import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offer } from 'src/app/models/Offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private baseUrl: string = "http://localhost:8080/";

  private allOffersUrl: string = this.baseUrl.concat("offers");

  constructor(private http: HttpClient) { }

  getAllOffers() {
    return this.http.get(this.allOffersUrl);
  }
}
