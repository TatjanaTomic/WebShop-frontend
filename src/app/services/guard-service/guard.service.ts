import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
	providedIn: 'root'
})
export class GuardService implements CanActivate {

	constructor(private authService: AuthService, private router: Router) { }

	canActivate(): boolean {
		if (this.authService.isSignedIn && this.authService.isActivated) {
			return true;
		}
		else if (this.authService.isSignedIn && !this.authService.isActivated) {
			this.router.navigate(['activation']);
			return false;
		}
		else {
			this.router.navigate(['home']);
			return false;
		}
	}

}
