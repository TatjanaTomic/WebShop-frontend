import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttributeValue } from 'src/app/models/AttributeValue';
import { Product } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:9000/api/v1/products';
  }

  public findAll() {
    return this.http.get<Product[]>(this.baseUrl);
  }

  public getAttributesValues(idProduct: number) {
    return this.http.get<AttributeValue[]>(this.baseUrl + '/attributes-values/' + idProduct);
  }
}
