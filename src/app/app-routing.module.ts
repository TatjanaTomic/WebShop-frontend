import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivationComponent } from './auth/activation/activation.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { SendMessageComponent } from './home/send-message/send-message/send-message.component';
import { ActivationGuardService } from './services/activation-guard-service/activation-guard.service';
import { GuardService } from './services/guard-service/guard.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'activation',
    component: ActivationComponent,
    canActivate: [ActivationGuardService]
  },
  {
    path: 'send-message',
    component: SendMessageComponent,
    canActivate: [GuardService]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
