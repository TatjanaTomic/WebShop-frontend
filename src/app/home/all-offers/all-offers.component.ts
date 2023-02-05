import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/models/Offer';
import { User } from 'src/app/models/User';
import { OffersService } from 'src/app/services/offers-service/offers.service';
import { UsersService } from 'src/app/services/users-service/users.service';

@Component({
  selector: 'app-all-offers',
  templateUrl: './all-offers.component.html',
  styleUrls: ['./all-offers.component.css']
})
export class AllOffersComponent implements OnInit {

  public offers: Offer[] = [];

  constructor(private offersService: OffersService) {
  }

  ngOnInit(): void {
    this.offersService.findAll().subscribe(data => { this.offers = data; });
  }
}
