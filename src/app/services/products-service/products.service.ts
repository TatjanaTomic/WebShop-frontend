import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttributeValue } from 'src/app/models/AttributeValue';
import { Product } from 'src/app/models/Product';
import { Value } from 'src/app/models/Value';

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

  public findById(id: number) {
    return this.http.get<Product>(this.baseUrl + '/' + id);
  }

  public add(product: Product) {
    return this.http.post<Product>(this.baseUrl, product);
  } 

  public getAttributesValues(idProduct: number) {
    return this.http.get<AttributeValue[]>(this.baseUrl + '/attributes-values/' + idProduct);
  }

  public addValue(value: Value) {
    return this.http.post<Value>('http://localhost:9000/api/v1/values', value);
  }
}
