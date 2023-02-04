import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AllOffersComponent } from './all-offers/all-offers.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { OfferComponent } from './offer/offer.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SendMessageComponent } from './send-message/send-message/send-message.component';



@NgModule({
  declarations: [
    HomeComponent,
    AllOffersComponent,
    OfferComponent,
    OfferDetailsComponent,
    HeaderComponent,
    SendMessageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    AppMaterialModule,
    HttpClientModule
  ]
})
export class HomeModule { }
