import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UsersService } from 'src/app/services/users-service/users.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	public passwordForm: FormGroup = new FormGroup({});
	public form: FormGroup = new FormGroup({});

	public user: User | null = null;

	constructor(
		private usersService: UsersService,
		private toast: ToastrService,
		private authService: AuthService,
		private formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
		if (this.authService.activeUser) {
			this.user = this.authService.activeUser;

			this.form = this.formBuilder.group({
				firstName: [this.user.firstName, Validators.required],
				lastName: [this.user.lastName, Validators.required],
				username: [this.user.username, Validators.required],
				mail: [this.user.mail, Validators.required],
				city: [this.user.city, Validators.required],
				avatar: [this.user.avatar]
			});

			this.passwordForm = this.formBuilder.group({
				password: [null, Validators.required],
				password2: [null, Validators.required]
			});
		}
	}

	public savePassword() {
		let password = this.passwordForm.value.password;
		let password2 = this.passwordForm.value.password2;

		if (password != password2) {
			this.toast.error("Lozinke se ne poklapaju!");
		}
		else {
			if (this.user) {
				let updatedUser = this.user;
				updatedUser.password = password;
				this.usersService.update(updatedUser).subscribe({
					next: (result: User) => {
						this.authService.activeUser = result;
						this.user = result;
						this.toast.success("Lozinka je uspješno promijenjena!");
						this.passwordForm.reset();
					},
					error: () => {
						this.toast.error("Došlo je do greške prilikom čuvanja lozinke! Pokušajte ponovo.");
						this.passwordForm.reset();
					}
				});
			}
		}
	}

	public saveUserInfo() {
		let firstName: string = this.form.value.firstName;
		let lastName: string = this.form.value.lastName;
		let username: string = this.form.value.username;
		let mail: string = this.form.value.mail;
		let city: string = this.form.value.city;
		let avatar: string | null = this.form.value.avatar;

		if (this.user) {
			let updatedUser = new User(this.user.id, firstName, lastName, username, this.user.password, city, avatar, mail, this.user.pin, this.user.isActivated, this.user.isDeleted);

			this.usersService.update(updatedUser).subscribe({
				next: (result: User) => {
					this.authService.activeUser = result;
					this.user = result;
					this.toast.success("Podaci su uspješno promijenjeni!");
				},
				error: () => {
					this.toast.error("Došlo je do greške prilikom čuvanja podataka! Pokušajte ponovo.");
				}
			});
		}
	}
}
