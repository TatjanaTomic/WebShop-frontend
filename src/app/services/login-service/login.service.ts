import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { User } from 'src/app/models/User';
import { UsersService } from '../users-service/users.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public activeUser: User|null = null;
  public isSignedIn: boolean = false;
  public isActivated: boolean = false;
  public users: User[] = [];


  constructor(private usersService: UsersService, private router: Router) { }

  public loginUser(username: string, password: string): boolean {

    let result = false;
    this.activeUser = null;
    this.usersService.findAll().subscribe(data => { this.users = data; });
    this.users.forEach(user => {
      if (user.username == username && user.password == password) {
        result = true;
        this.activeUser = user;
        this.isActivated = user.isActivated;
      }
    });
    this.isSignedIn = result;
    return result;
    
  }

  public logout() {
    this.activeUser = null;
    this.isSignedIn = false;
    this.isActivated = false;
    this.router.navigate(['/home']);
  }
}
