import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
	selector: 'app-activation',
	templateUrl: './activation.component.html',
	styleUrls: ['./activation.component.css'],
})
export class ActivationComponent implements OnInit {
	public form: FormGroup = new FormGroup({});

	constructor(
		private authService: AuthService,
		private formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			pin: [null, Validators.required],
		});
	}

	public activate() {
		let pin = this.form.value.pin;

		this.authService.activate(pin);
	}
}
