import { NonNullAssert } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/models/User';
import { UsersService } from '../users-service/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public activeUser: User|null = null;
  public isSignedIn: boolean = false;
  public isActivated: boolean = false;
  public users: User[] = [];

  constructor(private usersService: UsersService, private router: Router) {
    this.usersService.findAll().subscribe(data => { this.users = data; });
  }

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

  public isUsernameTaken(username: string): boolean {
    let result = false;

    this.usersService.findAll().subscribe(data => { this.users = data; });
    this.users.forEach(user => {
      if (user.username == username) {
        result = true;
      }
    });

    return result;
  }

  public register(user: User) {
    this.usersService.save(user).subscribe((response: any) => {
      console.log(response);
    });
  }

  public generatePIN() {
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  }
}
