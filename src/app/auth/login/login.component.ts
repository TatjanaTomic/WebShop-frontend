import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	public form: FormGroup = new FormGroup({});

	constructor(
		private authService: AuthService,
		private formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			username: [null, Validators.required],
			password: [null, Validators.required],
		});
	}

	public login() {
		let username: string = this.form.value.username;
		let password: string = this.form.value.password;

		this.authService.loginUser(username, password);
	}
} 
