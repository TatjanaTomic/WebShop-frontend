import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/Category';
import { Offer } from 'src/app/models/Offer';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CategoriesService } from 'src/app/services/categories-service/categories.service';
import { OffersService } from 'src/app/services/offers-service/offers.service';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {

  public user: User|null = null;
  public myOffers: Offer[] = [];

  constructor(private offersService: OffersService, private categoriesService: CategoriesService, private toast: ToastrService, private authService: AuthService) {}

  public ngOnInit(): void {
    this.loadData();
  }

  public getCategoryTitle(c: Category) {
    return this.categoriesService.getCategoryTitle(c);
  }

  public deleteOffer(offer: Offer) {
    let deletedOffer = offer;
    deletedOffer.isDeleted = true;
    deletedOffer.isActive = false;
    this.offersService.updateOffer(deletedOffer).subscribe({
      next: (result: Offer) => {
        this.toast.success("Ponuda je uspješno obrisana!");
        this.loadData();
      },
      error: () => {
        this.toast.error("Došlo je do greške prilikom brisanja! Pokušajte ponovo.");
      }
    });
  }

  private loadData() {
    if(this.authService.activeUser && this.authService.activeUser.id) {
      this.user = this.authService.activeUser;
      this.offersService.findByUserId(this.authService.activeUser.id).subscribe((data) => this.myOffers = data);
    }
  }
}
