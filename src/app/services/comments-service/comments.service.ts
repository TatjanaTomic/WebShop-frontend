import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyComment } from 'src/app/models/MyComment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:9000/api/v1/comments';
  }

  public findAll() {
    return this.http.get<MyComment[]>(this.baseUrl);
  }

  public findCommentsByOfferId(id: number) {
    return this.http.get<MyComment[]>(this.baseUrl + '/idOffer/' + id);
  }

  public addNew(comment: MyComment) {
    return this.http.post<MyComment>(this.baseUrl, comment);
  }
}
