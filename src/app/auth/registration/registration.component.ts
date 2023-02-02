import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public form: FormGroup = new FormGroup({});

  public message: string = "";

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      username: [null, Validators.required],
      mail: [null, Validators.required],
      password: [null, Validators.required],
      password2: [null, Validators.required],
      city: [null, Validators.required],
      avatar: [null]
    });
  }

  public register(form: any) {
    if(this.loginService.loginUser(form.value.username, form.value.password)) {
      this.router.navigate(['']);
    }
    else {
      this.message = "Neuspjesna registracija!";
    }
  }
}
