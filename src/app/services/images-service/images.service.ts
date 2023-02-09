import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from 'src/app/models/Image';
import { ImageRequest } from 'src/app/models/ImageRequest';

@Injectable({
	providedIn: 'root'
})
export class ImagesService {

	private baseUrl: string;

	constructor(private http: HttpClient) {
		this.baseUrl = 'http://localhost:9000/api/v1/images';
	}

	public findAll() {
		return this.http.get<Image>(this.baseUrl);
	}

	public insert(image: ImageRequest) {
		return this.http.post<Image>(this.baseUrl, image);
	}
}
