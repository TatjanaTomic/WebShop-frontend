import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Offer } from 'src/app/models/Offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  setPageSize(Page: number, Size: number): Offer[] {
    throw new Error('Method not implemented.');
  }
  getSize() {
    throw new Error('Method not implemented.');
  }

  private baseUrl: string;

  private offer$ = new BehaviorSubject<any>({});
  selectedOffer$ = this.offer$.asObservable();

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:9000/api/v1/offers';
  }

  setOffer(offer: any) {
    this.offer$.next(offer);
  }

  public findAll() {
    return this.http.get<Offer[]>(this.baseUrl);
  }

  public findByProductName(content: string) {
    return this.http.get<Offer[]>(this.baseUrl + '/product/' + content);
  }

  public findByCategoryId(id: number) {
    console.log("URL");
    console.log(this.baseUrl + '/idCategory/' + id);
    
    return this.http.get<Offer[]>(this.baseUrl + '/idCategory/' + id);
  }
}
