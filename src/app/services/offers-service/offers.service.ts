import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offer } from 'src/app/models/Offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:9000/api/v1/offers';
  }

  public findAll() {
    return this.http.get<Offer[]>(this.baseUrl);
  }
}
