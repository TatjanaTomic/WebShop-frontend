import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:9000/api/v1/user-accounts';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  public findByUsername(username: string) : Observable<User> {
    return this.http.get<User>(this.baseUrl + '/username/' + username);
  }

  public insert(user: User) {
    return this.http.post<User>(this.baseUrl, user);
  }

  public update(user: User) {
    return this.http.put<User>(this.baseUrl + '/' + user.id, user);
  }

}