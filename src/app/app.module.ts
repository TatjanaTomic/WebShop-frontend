import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppMaterialModule } from './app-material/app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		AppMaterialModule,
		BrowserAnimationsModule,
		HttpClientModule,
		HomeModule,
		AuthModule,
		ToastrModule.forRoot({
			timeOut: 2000,
			positionClass: 'toast-top-right',
			preventDuplicates: true,
		})
	],
	providers: [DatePipe],
	bootstrap: [AppComponent]
})
export class AppModule { }
