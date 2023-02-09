import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Purchase } from 'src/app/models/Purchase';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CategoriesService } from 'src/app/services/categories-service/categories.service';
import { PurchasesService } from 'src/app/services/purchases-service/purchases.service';

@Component({
	selector: 'app-my-purchases',
	templateUrl: './my-purchases.component.html',
	styleUrls: ['./my-purchases.component.css']
})
export class MyPurchasesComponent implements OnInit {

	public user: User | null = null;
	public myPurchases: Purchase[] = [];

	constructor(
		private purchasesService: PurchasesService,
		private categoriesService: CategoriesService,
		private authService: AuthService
	) { }

	public ngOnInit(): void {
		this.loadData();
	}

	public getCategoryTitle(c: Category) {
		return this.categoriesService.getCategoryTitle(c);
	}

	private loadData() {
		if (this.authService.activeUser && this.authService.activeUser.id) {
			this.user = this.authService.activeUser;
			this.purchasesService.findByUserId(this.authService.activeUser.id).subscribe((data) => {
				this.myPurchases = data;
				console.log(data);
			});
		}
	}
}
