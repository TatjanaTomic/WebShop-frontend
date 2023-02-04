import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { EmailService } from 'src/app/services/email-service/email.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup = new FormGroup({});

  constructor(private emailService: EmailService, private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  public login() {
    let username: string = this.form.value.username;
    let password: string = this.form.value.password;

    this.authService.loginUser(username, password);

    //this.emailService.send(new Mail("tatjanatomic997@yahoo.com", "hello")).subscribe();
  }
}
