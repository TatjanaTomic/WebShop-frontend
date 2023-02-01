import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public username: string = "";
  public isActive: boolean = false;

  constructor() { }

  public loginUser(username: string): boolean {
    this.username = username;
    this.isActive = true;
    return this.isActive;
  }
}
