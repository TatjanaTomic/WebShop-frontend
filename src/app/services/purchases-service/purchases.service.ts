import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from 'src/app/models/Purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:9000/api/v1/purchases';
  }

  public findAll() {
    return this.http.get<Purchase[]>(this.baseUrl);
  }

  public findByUserId(id: number) {
    return this.http.get<Purchase[]>(this.baseUrl + '/idUser/' + id);
  }

  public add(purchase: Purchase) {
    return this.http.post<Purchase>(this.baseUrl, purchase);
  }
}
