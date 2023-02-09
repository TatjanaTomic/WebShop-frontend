import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivationComponent } from './auth/activation/activation.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { MyOffersComponent } from './home/my-offers/my-offers.component';
import { MyPurchasesComponent } from './home/my-purchases/my-purchases.component';
import { NewOfferComponent } from './home/new-offer/new-offer.component';
import { OfferDetailsComponent } from './home/offer-details/offer-details.component';
import { ProfileComponent } from './home/profile/profile.component';
import { PurchaseComponent } from './home/purchase/purchase.component';
import { SendMessageComponent } from './home/send-message/send-message.component';
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
		path: 'profile',
		component: ProfileComponent,
		canActivate: [GuardService]
	},
	{
		path: 'details',
		component: OfferDetailsComponent
	},
	{
		path: 'my-offers',
		component: MyOffersComponent,
		canActivate: [GuardService]
	},
	{
		path: 'purchase',
		component: PurchaseComponent,
		canActivate: [GuardService]
	},
	{
		path: 'my-purchases',
		component: MyPurchasesComponent,
		canActivate: [GuardService]
	},
	{
		path: 'new-offer',
		component: NewOfferComponent,
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
