import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup = new FormGroup({});

  public message: string = "";

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  public login(form: any) {

    let username: string = form.value.username;
    let password: string = form.value.password;

    if(this.loginService.loginUser(username, password)) {
      if(this.loginService.isActivated) {
        this.router.navigate(['/home']);
      }
      else {
        this.router.navigate(['/activation']);
      }
    }
    else {
      this.message = "Neuspjesna prijava!";
      this.router.navigate(['/login']);
    }
  }
}
