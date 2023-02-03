import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  public form: FormGroup = new FormGroup({});

  public message: string = "";

  constructor(private loginService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      pin: [null, Validators.required]
    });
  }

  public activate(form: any) {
    if(this.loginService.loginUser(form.value.username, form.value.pin)) {
      this.router.navigate(['']);
    }
    else {
      this.message = "Neuspjesna aktivacija!";
    }
  }
}
