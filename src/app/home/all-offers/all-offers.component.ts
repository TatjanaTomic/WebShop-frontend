import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/models/Offer';
import { OffersService } from 'src/app/services/offers-service/offers.service';

@Component({
  selector: 'app-all-offers',
  templateUrl: './all-offers.component.html',
  styleUrls: ['./all-offers.component.css']
})
export class AllOffersComponent {

  public dataSource = [{"id":1,"dateTime":"2023-01-01T08:00:00.000+00:00","cardNumber":null,"paymentTypeName":"KARTICNO","offerId":1,"userAccountUsername":"user1"},{"id":2,"dateTime":"2022-05-05T08:00:00.000+00:00","cardNumber":null,"paymentTypeName":"GOTOVINOM","offerId":1,"userAccountUsername":"user2"},{"id":3,"dateTime":"2022-05-05T08:00:00.000+00:00","cardNumber":null,"paymentTypeName":"KARTICNO","offerId":1,"userAccountUsername":"user1"},{"id":4,"dateTime":"2022-05-05T08:00:00.000+00:00","cardNumber":null,"paymentTypeName":"GOTOVINOM","offerId":1,"userAccountUsername":"user2"}];

  constructor(private offersService: OffersService) {
    //this.dataSource = this.offersService.loadData();
    //this.readData();

  }
  readData() {
    //console.log(this.dataSource);
  }

  //getData() {
  //  this.dataSource = this.offersService.loadData();
  //}
}
