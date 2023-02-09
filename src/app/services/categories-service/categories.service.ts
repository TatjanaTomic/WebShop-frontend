import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attribute } from 'src/app/models/Attribute';
import { Category } from 'src/app/models/Category';

@Injectable({
	providedIn: 'root'
})
export class CategoriesService {

	private baseUrl: string;

	constructor(private http: HttpClient) {
		this.baseUrl = 'http://localhost:9000/api/v1/categories';
	}

	public findAll() {
		return this.http.get<Category[]>(this.baseUrl);
	}

	public findById(id: number) {
		return this.http.get<Category>(this.baseUrl + '/' + id);
	}

	public findCategoryAttributes(idCategory: number) {
		return this.http.get<Attribute[]>('http://localhost:9000/api/v1/attributes/idCategory/' + idCategory);
	}

	public getCategoryTitle(c: Category): string {
		if (c.parentCategory != null) {
			return this.getCategoryTitle(c.parentCategory) + "  >>  " + c.name;
		}
		else {
			return c.name;
		}
	}

}
