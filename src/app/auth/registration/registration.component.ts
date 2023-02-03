import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import '../../../assets/smtp.js';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public form: FormGroup = new FormGroup({});

  public message: string = "";

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

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

  public register() {

    this.message = "";

    let firstName: string = this.form.value.firstName;
    let lastName: string = this.form.value.lastName;
    let username: string = this.form.value.username;
    let password: string = this.form.value.password;
    let password2: string = this.form.value.password2;
    let mail: string = this.form.value.mail;
    let city: string = this.form.value.city;
    let avatar: string|null = this.form.value.avatar;

    if(password != password2) {
      this.message = "Lozinke se ne poklapaju!";
    }
    else if (this.authService.isUsernameTaken(username)) {
      this.message = "Korisnicko ime je zauzeto! Unesite novo korisnicko ime.";
    }
    else {
      let pin = this.authService.generatePIN();
      let user = new User(null, firstName, lastName, username, password, city, avatar, mail, pin, false, false);
    
      this.authService.register(user);
    }
    

    
  }

  
}
