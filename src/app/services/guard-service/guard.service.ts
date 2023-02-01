import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(): boolean {
    if(this.loginService.isActive) {
      return true;
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
