import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Mail } from 'src/app/models/Mail';
import { User } from 'src/app/models/User';
import { EmailService } from '../email-service/email.service';
import { UsersService } from '../users-service/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public activeUser: User|null = null;
  public isSignedIn: boolean = false;
  public isActivated: boolean = false;
  public users: User[] = [];

  constructor(private usersService: UsersService, private router: Router, private toast: ToastrService, private emailService: EmailService) {
    this.usersService.findAll().subscribe(data => { this.users = data; });
  }

  public loginUser(username: string, password: string) {
    this.usersService.findByUsername(username).subscribe({
      next: (response: User) => {

        if(response.password == password) {
          
          this.activeUser = response;
          this.isSignedIn = true;
          this.isActivated = response.isActivated;

          if(!response.isActivated) {
            this.sendNewPIN();
          }
          else {
            this.router.navigate(['/home']);
          }
        }
        else {
          this.toast.error("Pogrešna lozinka!");
        }
      },
      error: (response: HttpErrorResponse) => {
        if(response.status === 404) {
          this.toast.error("Pogrešno korisničko ime!");
        }
        else {
          this.toast.error("Dogodila se greška prilikom prijave! Pokušajte ponovo.");
        }
      }
    });
  }

  public register(user: User) {
    this.usersService.insert(user).subscribe({
      next: (result : User) => {

        this.activeUser = result;
        this.isSignedIn = true;
        this.isActivated = false;

        this.emailService.send(new Mail(result.mail, result.pin)).subscribe();
        this.toast.success("Uspješno ste se registrovali!");
        this.router.navigate(['/activation']);
      },
      error: (response: HttpErrorResponse) => {
        if(response.status === 409) {
          this.toast.error("Korisničko ime je zauzeto! Pokušajte ponovo.");
        }
        else {
          this.toast.error("Dogodila se greška prilikom registracije! Pokušajte ponovo.");
        }
      }
    });
  }

  public activate(pin: string) {
    if(this.activeUser && pin == this.activeUser.pin) {
      this.activeUser.isActivated = true;
      this.usersService.update(this.activeUser).subscribe({
        next: (result : User) => {
          this.activeUser = result;
          this.isActivated = true;

          this.toast.success("Uspješno ste aktivirali nalog!");
          this.router.navigate(['/home']);
        },
        error: (response: HttpErrorResponse) => {
          this.toast.error("Došlo je do greške prilikom aktivacije naloga!");
        }
      });
    }
    else if(this.activeUser && pin != this.activeUser.pin) {
      this.toast.error("Unijeli ste pogrešan PIN! Pokušajte ponovo.");
    }
    else {
      this.router.navigate(['/home']);
    }
  }

  public logout() {
    this.activeUser = null;
    this.isSignedIn = false;
    this.isActivated = false;
    this.router.navigate(['/home']);
    window.location.reload();
  }

  public generatePIN() {
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  }

  public sendNewPIN() {
    let newPin = this.generatePIN();
    if(this.activeUser) {
      this.activeUser.pin = newPin;
      this.usersService.update(this.activeUser).subscribe({
        next: (result: User) => {
          this.emailService.send(new Mail(result.mail, result.pin)).subscribe();
          this.activeUser = result;
          this.toast.warning("Morate da aktivirate nalog! Unesite novi PIN!");
          this.router.navigate(['/activation']);
        },
        error: () => {
          this.toast.error("Došlo je do greške prilikom slanja novog maila!");
          this.router.navigate(['/login']);}
      });
    }
    else {
      this.router.navigate(['/home']);
    }
  }
}
