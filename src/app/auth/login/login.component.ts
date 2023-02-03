import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup = new FormGroup({});

  public message: string = "";

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  public login() {

    this.message = "";

    let username: string = this.form.value.username;
    let password: string = this.form.value.password;

    var result = this.authService.loginUser(username, password)

    if(result) {
      if(this.authService.isActivated) {
        this.router.navigate(['/home']);
      }
      else {
        this.router.navigate(['/activation']);
      }
    }
    else {
      this.message = "Neuspjesna prijava! Pokusajte ponovo.";
      this.router.navigate(['/login']);
      this.form.reset();
    }
  }
}
