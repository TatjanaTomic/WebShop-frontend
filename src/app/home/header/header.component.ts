import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	public signedIn: boolean = false;

	constructor(private authService: AuthService) { }

	ngOnInit(): void {
		this.signedIn = this.authService.isSignedIn && this.authService.isActivated;
	}

	public logout() {
		this.authService.logout();
	}
}
