import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public username: string = "";
  public isActive: boolean = false;

  constructor() { }

  public loginUser(username: string, password: string): boolean {
    

    
    return false;
  }
}
