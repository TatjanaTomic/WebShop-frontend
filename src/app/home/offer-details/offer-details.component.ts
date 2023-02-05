import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/models/Offer';
import { OffersService } from 'src/app/services/offers-service/offers.service';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {

  public selectedOffer: Offer|null = null;

  constructor(private offersService: OffersService) {}

  ngOnInit() : void {
    this.offersService.selectedOffer$.subscribe((value) => {
      this.selectedOffer = value;
    });
  }

  
}
